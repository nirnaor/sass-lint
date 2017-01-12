'use strict';

var helpers = require('../helpers');

var uniq = function (v, i, a) {
  return a.indexOf(v) === i;
};

var isInclude = function (node) {
  return node.type === 'include';
};

var isIncludeWithOutContent = function (node) {
  return isInclude(node) && node.content.every(function (x) {
    return x.type !== 'block';
  });
};
var isDeclaration = function (node) {
  return node.type === 'declaration';
};
var isIncludeWithContent = function (node) {
  return isInclude(node) && node.content.some(function (x) {
    return x.type === 'block';
  });
};

var funcs = [isIncludeWithOutContent, isDeclaration, isIncludeWithContent];

var getOrder = function (node) {
  return funcs.findIndex(function (f) {
    return f(node);
  });
};

module.exports = {
  'name': 'no-nir',
  'defaults': {},
  detect: function (ast, parser) {
    var result = [];

    var parents = [];
    ast.traverseByType('include', function (node, i, parent) {
      parents.push(parent);
    });

    parents.filter(uniq).forEach(function (parent) {
      var siblingsToSort = parent.content.filter(function (n) {
        return ['include', 'declaration'].includes(n.type);
      });

      console.log(siblingsToSort.map(getOrder));
      console.log(siblingsToSort.map(function (x) {
        return funcs.map(function (f) {
          return f(x);
        });
      }).join('\n'));

      var current = 0;

      siblingsToSort.forEach(function (node) {
        var order = getOrder(node);
        if (order < current) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!!!!!!!!!!!!',
            'severity': parser.severity
          });
        }
        if (order > current) {
          current = order;
        }
      });
    });
    return result;
  }
};
