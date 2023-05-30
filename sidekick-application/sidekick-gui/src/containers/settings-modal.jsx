import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import bindAll from 'lodash.bindall';
import {defineMessages, injectIntl} from 'react-intl';
import VM from 'scratch-vm';

import SettingsComponent from '../components/settings-modal/settings-modal.jsx';

import {updateSetting} from '../reducers/settings';
import {setSeamless} from '../reducers/mode';

const messages = defineMessages({
    autosaveUnsupported: {
        defaultMessage: 'Your browser not support autosave :(',
        description: 'Label of unsupport browser',
        id: 'gui.settingsModal.autosave.unsupport'
    }
});

class SettingsModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeSettingsItem',
            'handleChangeFramerate',
            'handleChangeCompiler',
            'handleChangeSeamlessFullscreen',
            'handleChangeAutoSave',
            'handleChangeCompatibility',
            'handleChangeCompressionLevel',
            'handleChangeHQPen',
            'handleChangeSaveSettings'
        ]);
    }

    handleChangeSettingsItem (id, value) {
        this.props.updateSettings(id, value);
    }

    handleChangeCompiler (option) {
        this.props.vm.runtime.setCompiler(option);
    }

    handleChangeHQPen (option) {
        this.props.vm.renderer.setUseHighQualityPen(option);
    }
    
    handleChangeSaveSettings (option) {
        this.props.vm.runtime.storeSettings = !!option;
    }

    handleChangeFramerate (framerate) {
        this.props.updateSettings('framerate', framerate);
        this.props.vm.runtime.setFramerate(framerate);
    }

    handleChangeSeamlessFullscreen (value) {
        this.props.updateSettings('seamless', value);
        this.props.setSeamless(value);
    }

    handleChangeAutoSave (value) {
        if (window.showSaveFilePicker) {
            this.props.updateSettings('autosave', value);
        } else {
            /* eslint-disable no-alert */
            alert(this.props.intl.formatMessage(messages.autosaveUnsupproted));
        }
    }

    handleChangeCompatibility (mode) {
        this.props.updateSettings('compatibility', mode);
        this.props.vm.setDeserializeOption(mode);
    }

    handleChangeCompressionLevel (level) {
        this.props.updateSettings('compression', level);
        this.props.vm.setCompressionLevel(level);
    }

    render () {
        return (
            <SettingsComponent
                onChangeSettingsItem={this.handleChangeSettingsItem}
                onChangeFramerate={this.handleChangeFramerate}
                onChangeSeamlessFullscreen={this.handleChangeSeamlessFullscreen}
                onChangeAutoSave={this.handleChangeAutoSave}
                onChangeCompatibility={this.handleChangeCompatibility}
                onChangeCompressionLevel={this.handleChangeCompressionLevel}
                onChangeCompiler={this.handleChangeCompiler}
                onChangeHQPen={this.handleChangeHQPen}
                onChangeSaveSettings={this.handleChangeSaveSettings}
                {...this.props}
            />
        );
    }
}

SettingsModal.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired,
    extensionSettings: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    layoutStyle: PropTypes.string.isRequired,
    darkMode: PropTypes.string.isRequired,
    blur: PropTypes.bool.isRequired,
    framerate: PropTypes.number.isRequired,
    compiler: PropTypes.bool.isRequired,
    seamless: PropTypes.bool.isRequired,
    hqpen: PropTypes.bool.isRequired,
    autosave: PropTypes.bool.isRequired,
    hideNonOriginalBlocks: PropTypes.bool.isRequired,
    autosaveInterval: PropTypes.number.isRequired,
    compatibility: PropTypes.string.isRequired,
    compression: PropTypes.number.isRequired,
    saveSettings: PropTypes.bool.isRequired,
    saveExtension: PropTypes.bool.isRequired,
    saveOptionalExtension: PropTypes.bool.isRequired,
    updateSettings: PropTypes.func.isRequired,
    setSeamless: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    vm: state.sidekickGui.vm,
    extensionSettings: state.sidekickGui.extensionSettings,
    settings: state.sidekickGui.settings,
    layoutStyle: state.sidekickGui.settings.layoutStyle,
    darkMode: state.sidekickGui.settings.darkMode,
    blur: state.sidekickGui.settings.blur,
    framerate: state.sidekickGui.settings.framerate,
    compiler: state.sidekickGui.settings.compiler,
    hqpen: state.sidekickGui.settings.hqpen,
    seamless: state.sidekickGui.settings.seamless,
    autosave: state.sidekickGui.settings.autosave,
    autosaveInterval: state.sidekickGui.settings.autosaveInterval,
    compatibility: state.sidekickGui.settings.compatibility,
    compression: state.sidekickGui.settings.compression,
    hideNonOriginalBlocks: state.sidekickGui.settings.hideNonOriginalBlocks,
    saveSettings: state.sidekickGui.settings.saveSettings,
    saveExtension: state.sidekickGui.settings.saveExtension,
    saveOptionalExtension: state.sidekickGui.settings.saveOptionalExtension
});

const mapDispatchToProps = dispatch => ({
    updateSettings: (name, value) => dispatch(updateSetting(name, value)),
    setSeamless: value => dispatch(setSeamless(value))
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModal));
