"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _noae() {
  const data = require("noae");

  _noae = function _noae() {
    return data;
  };

  return data;
}

function _fs() {
  const data = require("fs");

  _fs = function _fs() {
    return data;
  };

  return data;
}

var _constants = require("./constants");

var _getTmpFile = require("./utils/getTmpFile");

var _getModels = require("./utils/getModels");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const lodash = _noae().utils.lodash;

var _default = api => {
  const paths = api.paths;

  function getModelDir() {
    return api.config.singular ? 'model' : 'models';
  }

  function getModelsPath() {
    return (0, _path().join)(paths.absSrcPath, getModelDir());
  }

  function getAllModels() {
    const srcModelsPath = getModelsPath();
    return lodash.uniq([...(0, _getModels.getModels)(srcModelsPath), ...(0, _getModels.getModels)(paths.absPagesPath, `**/${getModelDir()}/**/*.{ts,tsx,js,jsx}`), ...(0, _getModels.getModels)(paths.absPagesPath, `**/*.model.{ts,tsx,js,jsx}`)]);
  } // Add provider wrapper with rootContainer


  api.addRuntimePlugin(() => '../plugin-model/runtime');
  api.onGenerateFiles( /*#__PURE__*/_asyncToGenerator(function* () {
    const files = getAllModels();

    try {
      const additionalModels = yield api.applyPlugins({
        key: 'addExtraModels',
        type: api.ApplyPluginsType.add,
        initialValue: []
      });
      const tmpFiles = (0, _getTmpFile.getTmpFile)(files, additionalModels, paths.absSrcPath); // provider.tsx

      api.writeTmpFile({
        path: `${_constants.DIR_NAME_IN_TMP}/Provider.tsx`,
        content: tmpFiles.providerContent
      }); // useModel.tsx

      api.writeTmpFile({
        content: tmpFiles.useModelContent,
        path: `${_constants.DIR_NAME_IN_TMP}/useModel.tsx`
      }); // runtime.tsx

      api.writeTmpFile({
        path: 'plugin-model/runtime.tsx',
        content: _noae().utils.Mustache.render((0, _fs().readFileSync)((0, _path().join)(__dirname, 'runtime.tsx.tpl'), 'utf-8'), {})
      });
      api.writeTmpFile({
        path: 'plugin-model/helpers/constant.tsx',
        content: (0, _fs().readFileSync)((0, _path().join)(__dirname, './helpers/constant.tsx.tpl'), 'utf-8')
      });
      api.writeTmpFile({
        path: 'plugin-model/helpers/dispatcher.tsx',
        content: (0, _fs().readFileSync)((0, _path().join)(__dirname, './helpers/dispatcher.tsx.tpl'), 'utf-8')
      });
      api.writeTmpFile({
        path: 'plugin-model/helpers/executor.tsx',
        content: (0, _fs().readFileSync)((0, _path().join)(__dirname, './helpers/executor.tsx.tpl'), 'utf-8')
      });
    } catch (err) {
      console.error(err);
    }
  }));
  api.addTmpGenerateWatcherPaths(() => {
    const modelsPath = getModelsPath();
    return [modelsPath];
  }); // Export useModel and Models from noae

  api.addNoaeExports(() => [{
    exportAll: true,
    source: `../${_constants.DIR_NAME_IN_TMP}/useModel`
  }]);
};

exports.default = _default;