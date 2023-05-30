const process = require('process');
const { execSync } = require('child_process')
const { exec } = require('child_process');
var npmAddScript = require('npm-add-script')


const path = require('path');

const fs = require('fs');


const extensionFolder = 'extensions';
const pathToExtensionFolder = path.resolve(__dirname, extensionFolder);
var extensionName = '';
var extensionToBuild = '';

var implementedExtensionFolderNames = fs.readdirSync(pathToExtensionFolder);


// const executeCommand = function (cmd, successCallback, errorCallback, extensionName) {
//     console.log('Building Extension: ', extensionName);
//     exec(cmd, (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             if (errorCallback) {
//                 // errorCallback(error.message);
//                 console.log(error.message);
//             }
//             // return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             if (errorCallback) {
//                 // errorCallback(stderr);
//                 // console.log(stderr);
//             }
//             // return;
//         }
//         console.log(`stdout: ${stdout}`);
//         if (successCallback) {
//             // successCallback(stdout);
//             // console.log(stdout);
//             console.log('Built Extension: ', extensionName);
//         }
//     });
// };


const makeExtensionBuild = function (cmd, successCallback, errorCallback, extensionName) {
    try {
        console.log('Building Extension: ', extensionName);

        // let res = execSync(cmd => {
        // });
        let res = execSync(cmd)
        console.log(res.toString())
        console.log("BUILD SUCCESSFUL.")
    }
    catch (err) {

        console.log("output", err)
        console.log("sdterr", err.stderr.toString())
    }
};


// const removeExtensionData = function (filename, extensionName) {
//     fs.readFile(filename, { encoding: 'utf-8' }, function (err, data) {
//         if (err) throw error;

//         let dataArray = data.split('\n'); // convert file data in an array
//         const searchKeyword = 'build-extension:'; // we are looking for a line, contains, key word 'user1' in the file
//         let lastIndex = -1; // let say, we have not found the keyword

//         for (let index = 0; index < dataArray.length; index++) {
//             if (dataArray[index].includes(searchKeyword)) { // check if a line contains the 'user1' keyword
//                 lastIndex = index; // found a line includes a 'user1' keyword


//                 dataArray.splice(lastIndex, 1); // remove the keyword 'user1' from the data Array

//                 // UPDATE FILE WITH NEW DATA
//                 // IN CASE YOU WANT TO UPDATE THE CONTENT IN YOUR FILE
//                 // THIS WILL REMOVE THE LINE CONTAINS 'user1' IN YOUR shuffle.txt FILE
//                 const updatedData = dataArray.join('\n');
//                 fs.writeFile(filename, updatedData, (err) => {
//                     if (err) throw err;
//                     console.log('Successfully updated the file data');
//                 });
//                 break;
//             }
//         }
//     });
// }


// console.log(`${implementedExtensionFolderNames[0]}`);



implementedExtensionFolderNames.forEach((val, index) => {

    extensionName = val;
    extensionToBuild = extensionFolder + '/' + extensionName + '/';

    // npmAddScript({ key: "build-extension:" + extensionName, value: "rimraf ./" + extensionToBuild + "build && mkdirp " + extensionToBuild + "build && rimraf ./" + extensionToBuild + "dist && mkdirp " + extensionToBuild + "dist && node ./custom-webpack-config.js " + extensionName + " && webpack --env extension=" + extensionName, force: true });
    // npmAddScript({ key: "build-extension:" + extensionName, value: "rimraf ./" + extensionToBuild + "build && mkdirp " + extensionToBuild + "build && rimraf ./" + extensionToBuild + "dist && mkdirp " + extensionToBuild + "dist && webpack --env extensionName=" + extensionName, force: true });
    npmAddScript({ key: "build-extension", value: "rimraf ./" + extensionToBuild + "build && mkdirp " + extensionToBuild + "build && rimraf ./" + extensionToBuild + "dist && mkdirp " + extensionToBuild + "dist && webpack --env extensionName=" + extensionName, force: true });

    // executeCommand("yarn run build-extension:" + extensionName, "success", "error", extensionName);
    // executeCommand("yarn run build-extension", "success", "error", extensionName);
    makeExtensionBuild("yarn run build-extension", "success", "error", extensionName);
    // execSync("yarn run build-extension");
    console.log('Built Extension: ', extensionName);


});

// removeExtensionData('package.json', extensionName);

// let filename = 'package.json';

// fs.readFile(filename, 'utf8', function (err, data) {
//     if (err) {
//         // check and handle err
//     }
//     // data is the file contents as a single unified string
//     // .split('\n') splits it at each new-line character and all splits are aggregated into an array (i.e. turns it into an array of lines)
//     // .slice(1) returns a view into that array starting at the second entry from the front (i.e. the first element, but slice is zero-indexed so the "first" is really the "second")
//     // .join() takes that array and re-concatenates it into a string
//     var linesExceptFirst = data.split('\n').slice(1).join('\n');
//     fs.writeFile(filename, linesExceptFirst, function (err, data) { if (err) {/** check and handle err */ } });
// });


