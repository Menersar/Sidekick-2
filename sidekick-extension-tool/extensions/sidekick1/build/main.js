/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./extensions/sidekick1/index.js":
/*!***************************************!*\
  !*** ./extensions/sidekick1/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { api, type, Extension } = __webpack_require__(/*! scratch-extension */ \"scratch-extension\");\n\n// const DIGITAL_INPUT = 1;\n// const DIGITAL_OUTPUT = 2;\n// const LEDPIN = 12;\n\n// const FormSetLed = {\n//     'en': 'Set LED Number [LED_NUMBER] [RED_GREEN]',\n//     'de': 'Setze LED [LED_NUMBER] [RED_GREEN]',\n// };\n\n// menus: {\n//     led_numbers: {\n//         acceptReporters: true,\n//         items: ['1', '2', '3', '4', '5','6', '7', '8', '9']\n//     },\n\n//     red_green: {\n//         acceptReporters: true,\n//         items: ['red', 'green']\n//     },\n// };\n\nclass ExtensionSidekick extends Extension {\n  makeMenuFromArray(arr, menuTopic) {\n    const menu = [];\n    for (const item of arr) {\n      menu.push({\n        messageId: `sidekickteam.sidekick.menu.${menuTopic}.${item}`,\n        // messageId: \"sidekickteam.sidekick.menu.\" + menuTopic + `.${item}`,\n        value: item,\n      });\n    }\n    return menu;\n  }\n\n  onInit() {\n    api.addCategory({\n      categoryId: \"sidekickteam.sidekick.category\",\n      messageId: \"sidekickteam.sidekick.category\",\n      color: \"#b6d597\",\n    });\n\n    // api.addBlock({\n    //   opcode: \"sidekickteam.sidekick.setledcolour\",\n    //   type: type.BlockType.COMMAND,\n    //   messageId: \"sidekickteam.sidekick.setledcolour\",\n    //   categoryId: \"sidekickteam.sidekick.category\",\n    //   param: {\n    //     LED_NUMBER: {\n    //       type: type.ParameterType.NUMBER,\n    //       default: '1',\n    //       menu: \"led_numbers\"\n    //     },\n    //   },\n    //   function: (args) => this.setLEDColor(args.LED_NUMBER),\n    // });\n\n    // api.addBlock({\n    //   opcode: \"sidekickteam.sidekick.helloworld\",\n    //   type: type.BlockType.COMMAND,\n    //   messageId: \"sidekickteam.sidekick.helloworld\",\n    //   categoryId: \"sidekickteam.sidekick.category\",\n    //   function: (args) => this.HelloWorld(),\n    // });\n\n    api.addBlock({\n      opcode: \"sidekickteam.sidekick.setLEDColor\",\n      type: type.BlockType.COMMAND,\n      messageId: \"sidekickteam.sidekick.setLEDColor\",\n      categoryId: \"sidekickteam.sidekick.category\",\n      function: (args) => this.setLEDColor(args.COLOUR, args.LED_NUMBER),\n      param: {\n        COLOUR: {\n          type: type.ParameterType.COLOR,\n          default: \"#E96848\",\n        },\n        LED_NUMBER: {\n          type: type.ParameterType.NUMBER,\n          default: \"1\",\n          // menu: \"digital_pins\"\n          // hier dann die echten pins eintragen und bei den locales dann die \"übersetzung\" in die Nummer an den Steckverbindungen / LEDs\n          menu: this.makeMenuFromArray([\n            \"1\",\n            \"2\",\n            \"3\",\n            \"4\",\n            \"5\",\n            \"6\",\n            \"7\",\n            \"10\",\n            \"11\",\n          ], \"LED\"),\n        },\n        // JOIN: {\n        //   type: type.ParameterType.STRING,\n        //   default: \"y\",\n        // },\n      },\n    });\n\n    // api.menu({\n\n    //   digital_pins: {\n    //       acceptReporters: true,\n    //       items: ['2', '3', '4', '5', '6', '7', '8', '9',\n    //           '10', '11', '12', '13', '14', '15', '16',\n    //           '17', '18', '19', '20',\n    //           '21', '22', '23', '24', '25', '26', '27']\n    //   },\n    // });\n  }\n  onUninit() {\n    api.removeCategory(\"sidekickteam.sidekick.category\");\n    // api.removeInstance('sidekick');\n  }\n\n  //   ReturnValue(VALUE) {\n  //     return VALUE;\n  //   }\n\n  //   HelloWorld() {\n  //     console.log(\"MOIN!\");\n  //     alert(\"MOIN!\");\n  //   }\n\n  setLEDColor(color, number) {\n    if (typeof color == \"string\") {\n      alert(\"Color: \" + color + \", LED-Number: \" + parseInt(number));\n      //   return parseInt(color.slice(1, 7), 16);\n    } else if (typeof color == \"number\") {\n      alert(color + number);\n      //   return color;\n    } else {\n      alert(\"Error\");\n      //   return \"Error\";\n    }\n  }\n\n  //   setLEDColor(args) {\n  //     let ledPin = args[\"LED_NUMBER\"];\n  //     ledPin = parseInt(ledPin, 10);\n  //     if (pin_modes[ledPin] !== DIGITAL_OUTPUT) {\n  //       pin_modes[ledPin] = DIGITAL_OUTPUT;\n  //       msg = { command: \"set_mode_digital_output\", led_number: ledPin };\n  //       msg = JSON.stringify(msg);\n  //       log.log(msg);\n  //       let color = args[\"RED_GREEN\"];\n  //       // color = parseInt(color, 10);\n  //       msg = { command: \"set_led_on\", led_number: ledPin, color: color };\n  //       msg = JSON.stringify(msg);\n  //       log.log(msg);\n  //     }\n  //   }\n  //\n}\nmodule.exports = ExtensionSidekick;\n\n\n//# sourceURL=webpack://scratch-extension-tool/./extensions/sidekick1/index.js?");

/***/ }),

/***/ "scratch-extension":
/*!************************************!*\
  !*** external "SidekickExtension" ***!
  \************************************/
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
/******/ var __webpack_exports__ = __webpack_require__("./extensions/sidekick1/index.js");
/******/ module.exports = __webpack_exports__;
/******/ 
