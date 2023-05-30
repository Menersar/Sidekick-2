import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl} from 'react-intl';
import Modal from '../../containers/modal.jsx';
import styles from './contributor-modal.css';
import {contributorList} from './contributor-list.js';

const messages = defineMessages({
    contributorModalTitle: {
        defaultMessage: 'Contributor list',
        description: 'Title for contributor list modal',
        id: 'gui.contributorModal.contributorModalTitle'
    },
    majorDeveloper: {
        defaultMessage: 'Lead developer',
        description: 'label of lead developer',
        id: 'gui.contributorModal.majordeveloper'
    },
    developer: {
        defaultMessage: 'Developer',
        description: 'label of developer',
        id: 'gui.contributorModal.developer'
    },
    designer: {
        defaultMessage: 'Designer',
        description: 'label of designer',
        id: 'gui.contributorModal.designer'
    },
    investor: {
        defaultMessage: 'Investor',
        description: 'label of investor',
        id: 'gui.contributorModal.investor'
    },
    translator: {
        defaultMessage: 'Translator',
        description: 'label of translator',
        id: 'gui.contributorModal.translator'
    },
    advocates: {
        defaultMessage: 'Advocates',
        description: 'label of advocates',
        id: 'gui.contributorModal.advocates'
    },
    donor: {
        defaultMessage: 'Donor',
        description: 'label of donor',
        id: 'gui.contributorModal.donor'
    },
    andyou: {
        defaultMessage: 'And you.',
        description: 'label of and you',
        id: 'gui.contributorModal.andyou'
    }
});

const ContributorModal = ({
    intl,
    onRequestClose
}) => (
    <Modal
        className={styles.modalContent}
        contentLabel={intl.formatMessage(messages.contributorModalTitle)}
        onRequestClose={onRequestClose}
        id="contributorModal"
    >
        <Box
            className={styles.body}
            scrollbar
        >
            <strong>{intl.formatMessage(messages.majorDeveloper)}</strong>
            <p>{contributorList.sidekickteam}</p>
            <strong>{intl.formatMessage(messages.developer)}</strong>
            <p>{contributorList.sidekickteam}</p>
            <strong>{intl.formatMessage(messages.designer)}</strong>
            <p>{contributorList.sidekickteam}</p>
            <strong>{intl.formatMessage(messages.advocates)}</strong>
            <p>{contributorList.sidekickteam}</p>
            <strong>{intl.formatMessage(messages.investor)}</strong>
            <p>{contributorList.sidekickteam}</p>
            <strong>{intl.formatMessage(messages.translator)}</strong>
            <p>{contributorList.sidekickteam}</p>

            <strong>{intl.formatMessage(messages.donor)}</strong>
            <p>{contributorList.sidekickteam}</p>
            <strong>{intl.formatMessage(messages.andyou)}</strong>
        </Box>
    </Modal>
);

ContributorModal.propTypes = {
    onRequestClose: PropTypes.func.isRequired
};

export default injectIntl(ContributorModal);
