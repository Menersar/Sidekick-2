const process = require('process');
const { execSync } = require('child_process')
var npmAddScript = require('npm-add-script')

const extensionFolder = 'extensions';

var extensionName = '';
var extensionToBuild = '';

const makeExtensionBuild = function (cmd, successCallback, errorCallback, extensionName) {
    try {
        console.log('Building Extension: ', extensionName);
        let res = execSync(cmd)
        console.log(res.toString())
        console.log("BUILD SUCCESSFUL.")
    }
    catch (err) {
        console.log("output", err)
        console.log("sdterr", err.stderr.toString())
    }
};


process.argv.forEach((val, index) => {
    if (index >= 2) {

        console.log('____________________________________');
        console.log(`${index - 1}: ${val}`);

        extensionName = val;
        extensionToBuild = extensionFolder + '/' + extensionName + '/';

        npmAddScript({ key: "build-extension", value: "rimraf ./" + extensionToBuild + "build && mkdirp " + extensionToBuild + "build && rimraf ./" + extensionToBuild + "dist && mkdirp " + extensionToBuild + "dist && webpack --env extensionName=" + extensionName, force: true });
        makeExtensionBuild("yarn run build-extension", "success", "error", extensionName);
        console.log('Built Extension: ', extensionName);
    }

});
