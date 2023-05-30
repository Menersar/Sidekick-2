import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';
import helpIcon from './icons/help.svg';
import backIcon from './icons/back.svg';
import bluetoothIcon from './icons/bluetooth.svg';
import sidekickLinkIcon from './icons/sidekicklink.svg';

import styles from './connection-modal.css';

const UnavailableStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <div className={styles.sidekickLinkHelp}>
                <div className={styles.sidekickLinkHelpStep}>
                    <div className={styles.helpStepNumber}>
                        {'1'}
                    </div>
                    <div className={styles.helpStepImage}>
                        <img
                            className={styles.sidekickLinkIcon}
                            src={sidekickLinkIcon}
                        />
                    </div>
                    <div className={styles.helpStepText}>
                        <FormattedMessage
                            defaultMessage="Make sure you have Sidekick Link installed and running"
                            description="Message for getting Sidekick Link installed"
                            id="gui.connection.unavailable.installsidekicklink"
                        />
                    </div>
                </div>
                <div className={styles.sidekickLinkHelpStep}>
                    <div className={styles.helpStepNumber}>
                        {'2'}
                    </div>
                    <div className={styles.helpStepImage}>
                        <img
                            className={styles.sidekickLinkIcon}
                            src={bluetoothIcon}
                        />
                    </div>
                    <div className={styles.helpStepText}>
                        <FormattedMessage
                            defaultMessage="Check that Bluetooth is enabled"
                            description="Message for making sure Bluetooth is enabled"
                            id="gui.connection.unavailable.enablebluetooth"
                        />
                    </div>
                </div>
            </div>
        </Box>
        <Box className={styles.bottomArea}>
            <Dots
                error
                className={styles.bottomAreaItem}
                total={3}
            />
            <Box className={classNames(styles.bottomAreaItem, styles.buttonRow)}>
                <button
                    className={styles.connectionButton}
                    onClick={props.onScanning}
                >
                    <img
                        className={classNames(styles.buttonIconLeft, styles.buttonIconBack)}
                        src={backIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Try again"
                        description="Button to initiate trying the device connection again after an error"
                        id="gui.connection.unavailable.tryagainbutton"
                    />
                </button>
                <button
                    className={styles.connectionButton}
                    onClick={props.onHelp}
                >
                    <img
                        className={styles.buttonIconLeft}
                        src={helpIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Help"
                        description="Button to view help content"
                        id="gui.connection.unavailable.helpbutton"
                    />
                </button>
            </Box>
        </Box>
    </Box>
);

UnavailableStep.propTypes = {
    onHelp: PropTypes.func,
    onScanning: PropTypes.func
};

export default UnavailableStep;
