const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_SEAMLESS = 'scratch-gui/mode/SET_SEAMLESS';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';

const initialState = {
    showBranding: false,
    isFullScreen: false,
    isPlayerOnly: false,
    isSeamless: false,
    hasEverEnteredEditor: true
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FULL_SCREEN:
        if (state.isSeamless) {
            if (action.isFullScreen) document.documentElement.requestFullscreen();
            else document.exitFullscreen();
        }
        return Object.assign({}, state, {
            isFullScreen: action.isFullScreen
        });
    case SET_SEAMLESS:
        return Object.assign({}, state, {
            isSeamless: action.isSeamless
        });
    case SET_PLAYER:
        return Object.assign({}, state, {
            isPlayerOnly: action.isPlayerOnly,
            hasEverEnteredEditor: state.hasEverEnteredEditor || !action.isPlayerOnly
        });
    default:
        return state;
    }
};

const setSeamless = function (isSeamless) {
    return {
        type: SET_SEAMLESS,
        isSeamless: isSeamless
    };
}

const setFullScreen = function (isFullScreen) {
    return {
        type: SET_FULL_SCREEN,
        isFullScreen: isFullScreen
    };
};
const setPlayer = function (isPlayerOnly) {
    return {
        type: SET_PLAYER,
        isPlayerOnly: isPlayerOnly
    };
};

export {
    reducer as default,
    initialState as modeInitialState,
    setFullScreen,
    setSeamless,
    setPlayer
};
