/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, FormattedMessage} from 'react-intl';
import Modal from '../../containers/modal.jsx';
import styles from './about-modal.css';
import logo from './sidekick-logo.svg';
import github from './github.svg';

import {appVersion, appVersionFull, compileTime, isProd} from '../../lib/app-info';
import {isSidekickDesktop} from '../../lib/isSidekickDesktop';

const messages = defineMessages({
    aboutModalTitle: {
        defaultMessage: 'About',
        description: 'Title for about',
        id: 'gui.aboutModal.aboutModalTitle'
    },
    appVersion: {
        defaultMessage: 'Sidekick Version',
        description: 'Label for showing version',
        id: 'gui.aboutModal.appVersion'
    },
    desktopComponentVersion: {
        defaultMessage: '{component} Version',
        description: 'Label for showing version',
        id: 'gui.aboutModal.desktopComponentVersion'
    },
    license: {
        defaultMessage: 'License',
        description: 'Label for showing license',
        id: 'gui.aboutModal.license'
    },
    compileTime: {
        defaultMessage: 'Compile Time',
        description: 'Label for compile time',
        id: 'gui.aboutModal.compileTime'
    },
    licenseContent: {
        defaultMessage: 'BSD-3-Clause license',
        description: 'Content for showing license',
        id: 'gui.aboutModal.licenseContent'
    }
});

const AboutModal = ({
    intl,
    onRequestClose
}) => (
    <Modal
        className={styles.modalContent}
        contentLabel={intl.formatMessage(messages.aboutModalTitle)}
        onRequestClose={onRequestClose}
        id="aboutModal"
    >
        <Box className={styles.body}>
            <img
                src={logo}
                className={styles.logo}
            />
            <p>
                <strong><FormattedMessage {...messages.appVersion} /></strong>
                {': '}
                <span>{isProd ? appVersion : appVersionFull}</span>
            </p>
            <p>
                <strong><FormattedMessage {...messages.compileTime} /></strong>
                {': '}
                <span>{compileTime}</span>
            </p>
            {isSidekickDesktop() && typeof global.Scratch !== 'undefined' ? (
                ['Electron', 'Chrome', 'Node', 'Tauri'].map(component => {
                    if (global.Scratch.versions &&
                        typeof global.Scratch.versions[component.toLowerCase()] !== 'undefined'
                    ) {
                        return (
                            <p key={component}>
                                <strong><FormattedMessage
                                    values={{component}}
                                    {...messages.desktopComponentVersion}
                                /></strong>
                                {': '}
                                <span>{global.Scratch.versions && global.Scratch.versions[component.toLowerCase()]}</span>
                            </p>
                        );
                    }
                    return null;
                })) : null}
            <p>
                <strong><FormattedMessage {...messages.license} /></strong>
                {': '}
                <FormattedMessage {...messages.licenseContent} />
            </p>
            <div className={styles.contact}>
                <a
                    href="https://github.com/Menersar/sidekick"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        draggable={false}
                        alt="GitHub"
                        title="GitHub"
                        src={github}
                    />
                </a>
            </div>
        </Box>
    </Modal>
);

AboutModal.propTypes = {
    onRequestClose: PropTypes.func.isRequired
};

export default injectIntl(AboutModal);
