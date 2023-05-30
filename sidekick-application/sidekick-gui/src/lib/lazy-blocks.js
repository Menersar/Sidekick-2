import blocks from './blocks.js';
/* eslint-disable linebreak-style */
// Loading sidekick-block asynchronously
let BlocksComponent = null;

const loaded = () => !!BlocksComponent;

const get = () => {
    if (!loaded()) return Error('blocks not loaded');
    return BlocksComponent;
};

const load = (vm, callback) => {
    if (BlocksComponent) return Promise.resolve(BlocksComponent);
    return import(/* webpackChunkName: "skblocks" */'scratch-block').then(data => {
        BlocksComponent = data.default;
        callback(blocks(vm));
        return BlocksComponent;
    });
};

export default {
    get,
    load,
    loaded
};
