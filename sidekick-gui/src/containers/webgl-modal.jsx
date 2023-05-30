import React from 'react';
import PropTypes from 'prop-types';

import WebGlModalComponent from '../components/webgl-modal/webgl-modal.jsx';

class WebGlModal extends React.Component {
    handleCancel () {
        // !!!
        // Eventuell eher (https://github.com/scratchfoundation/scratch-gui/commit/2a7ee98365dbc51dc1f11d99b39537bef992c7ef):
        // window.location.replace('https://scratch.mit.edu');
        window.history.back();
    }
    render () {
        return (
            <WebGlModalComponent
                isRtl={this.props.isRtl}
                onBack={this.handleCancel}
            />
        );
    }
}

WebGlModal.propTypes = {
    isRtl: PropTypes.bool
};

export default WebGlModal;
