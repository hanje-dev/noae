/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 998:
/***/ (function(module, exports, __nccwpck_require__) {

/* module decorator */ module = __nccwpck_require__.nmd(module);


/** @typedef {import("./index.js").MinimizedResult} MinimizedResult */

/** @typedef {import("./index.js").CustomOptions} CustomOptions */

/**
 * @template T
 * @param {import("./index.js").InternalOptions<T>} options
 * @returns {Promise<MinimizedResult>}
 */
async function minify(options) {
  const {
    name,
    input,
    inputSourceMap,
    extractComments
  } = options;
  const {
    implementation,
    options: minimizerOptions
  } = options.minimizer;
  return implementation({
    [name]: input
  }, inputSourceMap, minimizerOptions, extractComments);
}
/**
 * @param {string} options
 * @returns {Promise<MinimizedResult>}
 */


async function transform(options) {
  // 'use strict' => this === undefined (Clean Scope)
  // Safer for possible security issues, albeit not critical at all here
  // eslint-disable-next-line no-param-reassign
  const evaluatedOptions =
  /**
   * @template T
   * @type {import("./index.js").InternalOptions<T>}
   * */
  // eslint-disable-next-line no-new-func
  new Function("exports", "require", "module", "__filename", "__dirname", `'use strict'\nreturn ${options}`)(exports, require, module, __filename, __dirname);
  return minify(evaluatedOptions);
}

module.exports = {
  minify,
  transform
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__nccwpck_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(998);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;