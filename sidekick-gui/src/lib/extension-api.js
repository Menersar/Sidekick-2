class ExtensionAPI {
    constructor (gui) {
        this.gui = gui;
    }
    
    isDesktop () {
        return this.gui.props.isSidekickDesktop;
    }
    
    isEditorLoading () {
        return this.gui.props.isLoading;
    }

    getSettings (id) {
        return this.gui.props.settings[id];
    }
}

export default ExtensionAPI;
