import PropTypes from 'prop-types';
import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import VM from 'scratch-vm';
import {injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';

import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import {
    getIsError,
    getIsShowingProject
} from '../reducers/project-state';
import {
    activateTab,
    BLOCKS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';

import {
    closeCostumeLibrary,
    closeBackdropLibrary,
    closeTelemetryModal,
    openExtensionLibrary,
    closeSettingsModal,
    closeAboutModal,
    closeContributorModal,
    openLoadingProject,
    closeLoadingProject,
    closeLoadErrorModal
} from '../reducers/modals';

import {
    LoadingStates,
    getIsLoadingUpload,
    getIsShowingWithoutId,
    onLoadedProject,
    requestProjectUpload
} from '../reducers/project-state';
import {setProjectTitle} from '../reducers/project-title';

import FontLoaderHOC from '../lib/font-loader-hoc.jsx';
import LocalizationHOC from '../lib/localization-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import ProjectFetcherHOC from '../lib/project-fetcher-hoc.jsx';
import TitledHOC from '../lib/titled-hoc.jsx';
import ProjectSaverHOC from '../lib/project-saver-hoc.jsx';
import QueryParserHOC from '../lib/query-parser-hoc.jsx';
import storage from '../lib/storage';
import vmListenerHOC from '../lib/vm-listener-hoc.jsx';
import extensionAPI from '../lib/extension-api.js';
import vmManagerHOC from '../lib/vm-manager-hoc.jsx';
import cloudManagerHOC from '../lib/cloud-manager-hoc.jsx';
import {loadBuiltinExtension, initExtensionAPI} from '../lib/extension-manager.js';

import GUIComponent from '../components/gui/gui.jsx';
import {setIsSidekickDesktop} from '../lib/isSidekickDesktop.js';

let api = null;

class GUI extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleBlocksLoad']);
    }
    componentDidMount () {
        this.props.onRef(this);
        setIsSidekickDesktop(this.props.isSidekickDesktop);
        this.props.onStorageInit(storage);
        this.props.onVmInit(this.props.vm);
        if (!api) { // sk - react-intl will remount all components after changing langauge
            api = this.extensionAPI = new extensionAPI(this);
            this.props.onLoadBuiltinExtension();
        } else {
            this.extensionAPI = api;
        }
    }
    componentDidUpdate (prevProps) {
        if (this.props.projectId !== prevProps.projectId && this.props.projectId !== null) {
            this.props.onUpdateProjectId(this.props.projectId);
        }
        if (this.props.isShowingProject && !prevProps.isShowingProject) {
            // this only notifies container when a project changes from not yet loaded to loaded
            // At this time the project view in www doesn't need to know when a project is unloaded
            this.props.onProjectLoaded();
        }

    }
    handleBlocksLoad (block) {
        initExtensionAPI(this, this.props.vm, block);
    }
    render () {
        if (this.props.isError) {
            throw new Error(
                `Error in Sidekick GUI [location=${window.location}]: ${this.props.error}`);
        }
        const {
            /* eslint-disable no-unused-vars */
            assetHost,
            blur,
            cloudHost,
            darkMode,
            error,
            errorModalVisible,
            isError,
            isSidekickDesktop,
            isShowingProject,
            onProjectLoaded,
            onStorageInit,
            onUpdateProjectId,
            onVmInit,
            projectHost,
            projectId,
            onLoadingFinished,
            onLoadingStarted,
            requestProjectUpload,
            onReceivedProjectTitle,
            loadingState,
            onRef,
            onLoadBuiltinExtension,
            /* eslint-enable no-unused-vars */
            children,
            fetchingProject,
            isLoading,
            loadingStateVisible,
            ...componentProps
        } = this.props;
        document.body.setAttribute('theme', darkMode);
        document.body.setAttribute('effect', blur ? 'blur' : null);
        return (
            <GUIComponent
                loading={fetchingProject || isLoading || loadingStateVisible}
                onBlocksLoad={this.handleBlocksLoad}
                {...componentProps}
            >
                {children}
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    assetHost: PropTypes.string,
    blur: PropTypes.bool,
    children: PropTypes.node,
    cloudHost: PropTypes.string,
    darkMode: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    fetchingProject: PropTypes.bool,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    loadingState: PropTypes.oneOf(LoadingStates),
    isSidekickDesktop: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    loadingStateVisible: PropTypes.bool,
    onRef: PropTypes.func,
    onLoadingStarted: PropTypes.func,
    onLoadingFinished: PropTypes.func,
    onLoadBuiltinExtension: PropTypes.func,
    requestProjectUpload: PropTypes.func,
    onProjectLoaded: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onStorageInit: PropTypes.func,
    onUpdateProjectId: PropTypes.func,
    onVmInit: PropTypes.func,
    projectHost: PropTypes.string,
    projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    telemetryModalVisible: PropTypes.bool,
    settings: PropTypes.object.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

GUI.defaultProps = {
    isSidekickDesktop: false,
    // !!!
    onStorageInit: storageInstance => storageInstance.addOfficialSidekickWebStores(),
    onProjectLoaded: () => {},
    onUpdateProjectId: () => {},
    onRef: () => {},
    onVmInit: (/* vm */) => {}
};

const mapStateToProps = state => {
    const loadingState = state.sidekickGui.projectState.loadingState;
    let darkMode = state.sidekickGui.settings.darkMode;
    if (darkMode === 'system') {
        if (matchMedia('(prefers-color-scheme: dark)').matches) {
            darkMode = 'dark';
        } else {
            darkMode = 'light';
        }
    }
    return {
        activeTabIndex: state.sidekickGui.editorTab.activeTabIndex,
        alertsVisible: state.sidekickGui.alerts.visible,
        backdropLibraryVisible: state.sidekickGui.modals.backdropLibrary,
        blocksTabVisible: state.sidekickGui.editorTab.activeTabIndex === BLOCKS_TAB_INDEX,
        blur: state.sidekickGui.settings.blur,
        cardsVisible: state.sidekickGui.cards.visible,
        connectionModalVisible: state.sidekickGui.modals.connectionModal,
        costumeLibraryVisible: state.sidekickGui.modals.costumeLibrary,
        costumesTabVisible: state.sidekickGui.editorTab.activeTabIndex === COSTUMES_TAB_INDEX,
        darkMode: darkMode,
        error: state.sidekickGui.projectState.error,
        errorModalVisible: state.sidekickGui.modals.errorModal,
        isError: getIsError(loadingState),
        isFullScreen: state.sidekickGui.mode.isFullScreen,
        isPlayerOnly: state.sidekickGui.mode.isPlayerOnly,
        isRtl: state.locales.isRtl,
        isShowingProject: getIsShowingProject(loadingState),
        loadingState: loadingState,
        loadingStateVisible: state.sidekickGui.modals.loadingProject,
        projectId: state.sidekickGui.projectState.projectId,
        soundsTabVisible: state.sidekickGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
        targetIsStage: (
            state.sidekickGui.targets.stage &&
            state.sidekickGui.targets.stage.id === state.sidekickGui.targets.editingTarget
        ),
        telemetryModalVisible: state.sidekickGui.modals.telemetryModal,
        tipsLibraryVisible: state.sidekickGui.modals.tipsLibrary,
        settingsVisible: state.sidekickGui.modals.settings,
        aboutModalVisible: state.sidekickGui.modals.about,
        loadErrorModalVisible: state.sidekickGui.modals.loadError,
        contributorModalVisible: state.sidekickGui.modals.contributor,
        layoutStyle: state.sidekickGui.settings.layoutStyle,
        settings: state.sidekickGui.settings,
        vm: state.sidekickGui.vm
    };
};

const mapDispatchToProps = dispatch => ({
    onExtensionButtonClick: () => dispatch(openExtensionLibrary()),
    onActivateTab: tab => dispatch(activateTab(tab)),
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
    onRequestCloseBackdropLibrary: () => dispatch(closeBackdropLibrary()),
    onRequestCloseCostumeLibrary: () => dispatch(closeCostumeLibrary()),
    onRequestCloseTelemetryModal: () => dispatch(closeTelemetryModal()),
    onRequestCloseSettingsModal: () => dispatch(closeSettingsModal()),
    onRequestCloseAboutModal: () => dispatch(closeAboutModal()),
    onRequestCloseLoadErrorModal: () => dispatch(closeLoadErrorModal()),
    onRequestCloseContributorModal: () => dispatch(closeContributorModal()),
    onLoadingFinished: (loadingState, success) => {
        dispatch(onLoadedProject(loadingState, false, success));
        dispatch(closeLoadingProject());
    },
    requestProjectUpload: loadingState => dispatch(requestProjectUpload(loadingState)),
    onLoadingStarted: () => dispatch(openLoadingProject()),
    onReceivedProjectTitle: title => dispatch(setProjectTitle(title)),
    onLoadBuiltinExtension: () => loadBuiltinExtension(dispatch)
});

const ConnectedGUI = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps,
)(GUI));

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedGui = compose(
    LocalizationHOC,
    ErrorBoundaryHOC('Top Level App'),
    FontLoaderHOC,
    QueryParserHOC,
    ProjectFetcherHOC,
    TitledHOC,
    ProjectSaverHOC,
    vmListenerHOC,
    vmManagerHOC,
    SBFileUploaderHOC,
    cloudManagerHOC
)(ConnectedGUI);

WrappedGui.setAppElement = ReactModal.setAppElement;
export default WrappedGui;
