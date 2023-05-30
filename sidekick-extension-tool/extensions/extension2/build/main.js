/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./extensions/extension2/index.js":
/*!****************************************!*\
  !*** ./extensions/extension2/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {api, type, Extension} = __webpack_require__(/*! scratch-extension */ \"scratch-extension\");\nclass ExampleExtension extends Extension {\n    onInit() {\n        api.addCategory({\n            categoryId: 'author.exampleid.category',\n            messageId: 'author.exampleid.category',\n            color: '#339900'\n        });\n        api.addBlock({\n            opcode: 'author.exampleid.return',\n            type: type.BlockType.REPORTER,\n            messageId: 'author.exampleid.return',\n            categoryId: 'author.exampleid.category',\n            param: {\n                VALUE: {\n                    type: type.ParameterType.STRING,\n                    default: 'Hello World!'\n                }\n            },\n            function: args => this.ReturnValue(args.VALUE)\n        });\n        api.addBlock({\n            opcode: 'author.exampleid.helloworld',\n            type: type.BlockType.COMMAND,\n            messageId: 'author.exampleid.helloworld',\n            categoryId: 'author.exampleid.category',\n            function: args => this.HelloWorld()\n        });\n    }\n    onUninit() {\n        api.removeCategory('author.exampleid.category');\n    }\n    ReturnValue(VALUE) {\n        return VALUE;\n    }\n    HelloWorld() {\n        console.log(\"Hello World!\");\n        alert(\"Hello World!\");\n    }\n}\nmodule.exports = ExampleExtension;\n\n//# sourceURL=webpack://scratch-extension-tool/./extensions/extension2/index.js?");

/***/ }),

/***/ "scratch-extension":
/*!***********************************!*\
  !*** external "SidekickExtension" ***!
  \***********************************/
/***/ ((module) => {

module.exports = self["SidekickExtension"];

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__("./extensions/extension2/index.js");
/******/ module.exports = __webpack_exports__;
/******/ 
