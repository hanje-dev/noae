"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTmpFile = void 0;

var _getProviderContent = _interopRequireDefault(require("./getProviderContent"));

var _getUseModelContent = _interopRequireDefault(require("./getUseModelContent"));

function _os() {
  const data = require("os");

  _os = function _os() {
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

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable default-param-last */
const winPath = _noae().utils.winPath;

function getModels(files, absSrcPath) {
  const sortedModels = (0, _.genModels)(files, absSrcPath);
  return sortedModels.map(ele => `'${ele.namespace.replace(/'/g, "\\'")}': ${ele.importName}`).join(', ');
}

function getExtraModels(models = [], absSrcPath) {
  const extraModels = (0, _.genExtraModels)(models, absSrcPath);
  return extraModels.map(ele => `'${ele.namespace}': ${ele.exportName || ele.importName}`).join(', ');
}

function getExtraImports(models = [], absSrcPath) {
  const extraModels = (0, _.genExtraModels)(models, absSrcPath);
  return extraModels.map(ele => {
    if (ele.exportName) {
      return `import { ${ele.exportName} } from '${winPath(ele.importPath.replace(/'/g, "\\'"))}';`;
    }

    return `import ${ele.importName} from '${winPath(ele.importPath.replace(/'/g, "\\'"))}';`;
  }).join(_os().EOL);
}

const getTmpFile = (files, extra = [], absSrcPath) => {
  const imports = (0, _.genImports)(files);
  const userModels = getModels(files, absSrcPath);
  const extraImports = getExtraImports(extra, absSrcPath);
  const extraModels = getExtraModels(extra, absSrcPath);
  const enable = Boolean(imports || extraImports);
  return {
    providerContent: (0, _getProviderContent.default)(imports, userModels, extraImports, extraModels),
    useModelContent: enable ? (0, _getUseModelContent.default)() : 'export const useModel = undefined;'
  };
};

exports.getTmpFile = getTmpFile;