import { defineMessages } from "react-intl";
import sharedMessages from "../shared-messages";

let messages = defineMessages({
    meow: {
        defaultMessage: "Meow",
        description: "Name for the meow sound",
        id: "gui.defaultProject.meow",
    },
    variable: {
        defaultMessage: "my variable",
        description: "Name for the default variable",
        id: "gui.defaultProject.variable",
    },
});

messages = { ...messages, ...sharedMessages };

// use the default message if a translation function is not passed
const defaultTranslator = (msgObj) => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectData = (translateFunction) => {
    const translator = translateFunction || defaultTranslator;
    return {
        targets: [
            {
                isStage: true,
                name: "Stage",
                variables: {
                    '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                        translator(messages.variable),
                        0
                    ]
                },
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: "cd21514d0531fdffb22204e0ec5ed84a",
                        name: "backdrop1",
                        // name: translator(messages.costume, { index: 1 }),
                        md5ext: "cd21514d0531fdffb22204e0ec5ed84a.svg",
                        dataFormat: "svg",
                        rotationCenterX: 240,
                        rotationCenterY: 180,
                    },
                ],
                sounds: [
                    {
                        assetId: "83a9787d4cb6f3b7632b4ddfebf74367",
                        name: translator(messages.pop),
                        dataFormat: "wav",
                        format: "",
                        rate: 11025,
                        sampleCount: 258,
                        md5ext: "83a9787d4cb6f3b7632b4ddfebf74367.wav",
                    },
                ],
                volume: 100,
                layerOrder: 0,
                tempo: 60,
                videoTransparency: 50,
                videoState: "on",
                textToSpeechLanguage: null,
            },
            {
                isStage: false,
                // name: translator(messages.sprite, {index: 1}),
                // name: translator(messages.meow),
                name: "Sidekick",
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                comments: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: "0fb9be3e8397c983338cb71dc84d0b25",
                        // name: translator(messages.costume, {index: 1}),
                        name: "sidekick1",
                        bitmapResolution: 1,
                        md5ext: "0fb9be3e8397c983338cb71dc84d0b25.svg",
                        dataFormat: "svg",
                        // rotationCenterX: 37.354164123535156,
                        // rotationCenterY: 45.80350112915039,
                        // rotationCenterX: 0,
                        // rotationCenterY: 0,
                        rotationCenterX: 50.383295,
                        rotationCenterY: 50.882895,
                        // rotationCenterX: 48,
                        // rotationCenterY: 50
                    },
                    {
                        assetId: "bcf454acf82e4504149f7ffe07081dbc",
                        // name: translator(messages.costume, {index: 2}),
                        name: "sidekick2",
                        bitmapResolution: 1,
                        md5ext: "bcf454acf82e4504149f7ffe07081dbc.svg",
                        dataFormat: "svg",
                        // rotationCenterX: 37.35414650815025,
                        // rotationCenterY: 45.803517747595805,
                        // rotationCenterX: 89.424845,
                        // rotationCenterY: 90.03507,
                        rotationCenterX: 50.383295,
                        rotationCenterY: 50.882895,
                        // rotationCenterX: 0,
                        // rotationCenterY: 0,
                        rotationCenterX: 46,
                        rotationCenterY: 53
                    },
                ],
                sounds: [
                    {
                        assetId: "83c36d806dc92327b9e7049a565c6bff",
                        name: translator(messages.meow),
                        // name: "Meow",
                        dataFormat: "wav",
                        format: "",
                        rate: 22050,
                        // sampleCount: 26417,
                        sampleCount: 18688,
                        md5ext: "83c36d806dc92327b9e7049a565c6bff.wav",
                    },
                ],
                volume: 100,
                layerOrder: 1,
                visible: true,
                x: 0,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: "all around",
            },
        ],
        monitors: [],
        extensions: {},
        meta: {
            semver: "3.0.0",
            editor: "sidekick",
            vm: "3.1.11",
            // agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' // eslint-disable-line max-len
            agent: "",
        },
    };
};

export default projectData;
