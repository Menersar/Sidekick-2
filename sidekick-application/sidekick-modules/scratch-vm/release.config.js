module.exports = {
    // ??? UMSCHREIBEN ???
    // !!! TESTEN !!!
    // !!!
    extends: 'scratch-semantic-release-config',
    branches: [
        {
            name: 'develop'
            // default channel
        },
        {
            name: 'hotfix/*',
            channel: 'hotfix'
        }
    ]
};
