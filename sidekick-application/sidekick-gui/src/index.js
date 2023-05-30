import GUI from './containers/gui.jsx';
import AppStateHOC from './lib/app-state-hoc.jsx';
import TitledHOC from './lib/titled-hoc.jsx';
import GuiReducer, {guiInitialState, guiMiddleware, initEmbedded, initFullScreen, initPlayer} from './reducers/gui';
import LocalesReducer, {localesInitialState, initLocale} from './reducers/locales';
import {SidekickPaintReducer} from 'scratch-paint';
import {setFullScreen, setPlayer} from './reducers/mode';
import {remixProject} from './reducers/project-state';
import {loadExtensionFromFile} from './lib/extension-manager.js';
import {setAppElement} from 'react-modal';
import totallyNormalStrings from './lib/l10n.js';

const guiReducers = {
    locales: LocalesReducer,
    sidekickGui: GuiReducer,
    sidekickPaint: SidekickPaintReducer
};

export {
    GUI as default,
    AppStateHOC,
    TitledHOC,
    setAppElement,
    guiReducers,
    guiInitialState,
    guiMiddleware,
    initEmbedded,
    initPlayer,
    initFullScreen,
    initLocale,
    localesInitialState,
    remixProject,
    setFullScreen,
    setPlayer,
    loadExtensionFromFile,
    totallyNormalStrings
};
