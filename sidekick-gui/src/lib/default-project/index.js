import projectData from './project-data';

/* eslint-disable import/no-unresolved,camelcase */
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import sidekick1 from '!raw-loader!./bcf454acf82e4504149f7ffe07081dbc.svg';
import sidekick2 from '!raw-loader!./0fb9be3e8397c983338cb71dc84d0b25.svg';
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import meowWav from '!arraybuffer-loader!./83c36d806dc92327b9e7049a565c6bff.wav';

/* eslint-enable import/no-unresolved,camelcase */

const defaultProject = translator => {
    const encoder = new TextEncoder();

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: '83a9787d4cb6f3b7632b4ddfebf74367',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(popWav)
    }, {
        id: '83c36d806dc92327b9e7049a565c6bff',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(meowWav)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: '0fb9be3e8397c983338cb71dc84d0b25',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(sidekick1)
    }, {
        id: 'bcf454acf82e4504149f7ffe07081dbc',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(sidekick2)
    }];
};

export default defaultProject;
