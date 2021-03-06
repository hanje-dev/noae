"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sort = exports.isValidHook = exports.getValidFiles = exports.getPath = exports.getName = exports.genModels = exports.genImports = exports.genExtraModels = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function _path() {
    return data;
  };

  return data;
}

function _os() {
  const data = require("os");

  _os = function _os() {
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

function _noae() {
  const data = require("noae");

  _noae = function _noae() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parser = _noae().utils.parser,
      traverse = _noae().utils.traverse,
      winPath = _noae().utils.winPath;

const getFileName = name => {
  const fileName = _path().default.basename(name, _path().default.extname(name));

  if (fileName.endsWith('.model') || fileName.endsWith('.models')) {
    return fileName.split('.').slice(0, -1).join('.');
  }

  return fileName;
};

const getName = (absPath, absSrcPath) => {
  const relativePath = _path().default.relative(absSrcPath, absPath); // model files with namespace


  const dirList = _path().default.dirname(relativePath).split(_path().default.sep);

  try {
    const validDirs = dirList.filter(ele => !['src', 'page', 'pages', 'model', 'models'].includes(ele));

    if (validDirs && validDirs.length) {
      return `${validDirs.join('.')}.${getFileName(relativePath)}`;
    }

    return getFileName(relativePath);
  } catch (e) {
    return getFileName(relativePath);
  }
};

exports.getName = getName;

const getPath = absPath => {
  const info = _path().default.parse(absPath);

  return winPath(_path().default.join(info.dir, info.name).replace(/'/, "'"));
};

exports.getPath = getPath;

const genImports = imports => imports.map((ele, index) => `import model${index} from "${winPath(getPath(ele))}";`).join(_os().EOL); // eslint-disable-next-line default-param-last


exports.genImports = genImports;

const genExtraModels = (models = [], absSrcPath) => models.map(ele => {
  if (typeof ele === 'string') {
    return {
      importPath: getPath(ele),
      importName: _path().default.basename(ele).split('.')[0],
      namespace: getName(ele, absSrcPath)
    };
  }

  return {
    importPath: getPath(ele.absPath),
    importName: _path().default.basename(ele.absPath).split('.')[0],
    namespace: ele.namespace,
    exportName: ele.exportName
  };
});

exports.genExtraModels = genExtraModels;

const sort = ns => {
  let final = [];
  ns.forEach((item, index) => {
    if (item.use && item.use.length) {
      const itemGroup = [...item.use, item.namespace];
      const cannotUse = [item.namespace];

      for (let i = 0; i <= index; i += 1) {
        if (ns[i].use.filter(v => cannotUse.includes(v)).length) {
          if (!cannotUse.includes(ns[i].namespace)) {
            cannotUse.push(ns[i].namespace);
            i = -1;
          }
        }
      }

      const errorList = item.use.filter(v => cannotUse.includes(v));

      if (errorList.length) {
        throw Error(`Circular dependencies: ${item.namespace} can't use ${errorList.join(', ')}`);
      }

      const intersection = final.filter(v => itemGroup.includes(v));

      if (intersection.length) {
        // first intersection
        const finalIndex = final.indexOf(intersection[0]); // replace with groupItem

        final = final.slice(0, finalIndex).concat(itemGroup).concat(final.slice(finalIndex + 1));
      } else {
        final.push(...itemGroup);
      }
    }

    if (!final.includes(item.namespace)) {
      // first occurance append to the end
      final.push(item.namespace);
    }
  });
  return [...new Set(final)];
};

exports.sort = sort;

const genModels = (imports, absSrcPath) => {
  const contents = imports.map(absPath => ({
    namespace: getName(absPath, absSrcPath),
    content: (0, _fs().readFileSync)(absPath).toString()
  }));
  const allUserModel = imports.map(absPath => getName(absPath, absSrcPath));

  const checkDuplicates = list => new Set(list).size !== list.length;

  const raw = contents.map((ele, index) => {
    const ast = parser.parse(ele.content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });
    const use = [];
    traverse.default(ast, {
      enter(astPath) {
        if (astPath.isIdentifier({
          name: 'useModel'
        })) {
          try {
            // string literal
            const ns = astPath.parentPath.node.arguments[0].value;

            if (allUserModel.includes(ns)) {
              use.push(ns);
            }
          } catch (e) {// console.log(e)
          }
        }
      }

    });
    return {
      namespace: ele.namespace,
      use,
      importName: `model${index}`
    };
  });
  const models = sort(raw);

  if (checkDuplicates(contents.map(ele => ele.namespace))) {
    throw Error('noae: models ?????????????????? namespace???');
  }

  return raw.sort((a, b) => models.indexOf(a.namespace) - models.indexOf(b.namespace));
};

exports.genModels = genModels;

const isValidHook = filePath => {
  const isTS = _path().default.extname(filePath) === '.ts';
  const isTSX = _path().default.extname(filePath) === '.tsx';
  const content = (0, _fs().readFileSync)(filePath, {
    encoding: 'utf-8'
  }).toString();
  const ast = parser.parse(content, {
    sourceType: 'module',
    plugins: [// .ts ????????? jsx???????????????????????? `<Type>{}` ????????????
    // .tsx, .js, .jsx ?????????
    isTS ? false : 'jsx', // ??? ts ????????? typescript
    isTS || isTSX ? 'typescript' : false, // ??????????????????
    'classProperties', 'dynamicImport', 'exportDefaultFrom', 'exportNamespaceFrom', 'functionBind', 'nullishCoalescingOperator', 'objectRestSpread', 'optionalChaining', 'decorators-legacy'].filter(Boolean)
  });
  let valid = false;
  let identifierName = '';
  traverse.default(ast, {
    enter(p) {
      if (p.isExportDefaultDeclaration()) {
        const type = p.node.declaration.type;

        try {
          if (type === 'ArrowFunctionExpression' || type === 'FunctionDeclaration') {
            valid = true;
          } else if (type === 'Identifier') {
            identifierName = p.node.declaration.name;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

  });

  try {
    if (identifierName) {
      ast.program.body.forEach(ele => {
        if (ele.type === 'FunctionDeclaration') {
          var _ele$id;

          if (((_ele$id = ele.id) === null || _ele$id === void 0 ? void 0 : _ele$id.name) === identifierName) {
            valid = true;
          }
        }

        if (ele.type === 'VariableDeclaration') {
          if (ele.declarations[0].id.name === identifierName && ele.declarations[0].init.type === 'ArrowFunctionExpression') {
            valid = true;
          }
        }
      });
    }
  } catch (e) {
    valid = false;
  }

  return valid;
};

exports.isValidHook = isValidHook;

const getValidFiles = (files, modelsDir) => files.map(file => {
  const filePath = _path().default.join(modelsDir, file);

  const valid = isValidHook(filePath);

  if (valid) {
    return filePath;
  }

  return '';
}).filter(ele => !!ele);

exports.getValidFiles = getValidFiles;