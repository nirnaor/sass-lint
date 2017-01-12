'use strict';

var helpers = require('../helpers');

var uniq = function (v, i, a) {
  return a.indexOf(v) === i;
};

// var isExtend = function (node) {
//   return node.type === 'extend';
// };

var isInclude = function (node) {
  return node.type === 'include';
};

var containsBlock = function (node) {
  return node.content.some(function (x) {
    return x.type === 'block';
  });
};

var isIncludeWithOutBlock = function (node) {
  return isInclude(node) && !containsBlock(node);
};

var isDeclaration = function (node) {
  return node.type === 'declaration';
};

var isIdentDeclaration = function (node) {
  return isDeclaration(node) && node.content.some(function (n1) {
    return n1.content.some && n1.content.some(function (n2) {
      return n2.type === 'ident';
    });
  });
};

var isIncludeWithBlock = function (node) {
  return isInclude(node) && containsBlock(node);
};

var nodeTypes = {
  // include: isInclude, // not tested yet
  // extend: isExtend, // not tested yet
  includeWithoutBlock: isIncludeWithOutBlock,
  declaration: isDeclaration,
  identDeclaration: isIdentDeclaration,
  includeWithBlock: isIncludeWithBlock
};

module.exports = {
  'name': 'ruleset-order',
  'defaults': {
    'order': ['includeWithoutBlock', 'identDeclaration', 'includeWithBlock']
  },
  detect: function (ast, parser) {
    var result = [];

    var nodeTypesOrder = parser.options.order;
    var funcs = nodeTypesOrder.map(function (k) {
      return nodeTypes[k];
    });

    var getOrder = function (node) {
      return funcs.findIndex(function (f) {
        return f(node);
      });
    };

    var parents = [];
    ast.traverseByType('include', function (node, i, parent) {
      parents.push(parent);
    });

    parents.filter(uniq).forEach(function (parent) {
      var current = 0;

      parent.content.forEach(function (node) {
        var order = getOrder(node);
        if (order === -1) {
          return;
        }
        if (order < current) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': ['"', nodeTypesOrder[order], '" should come after "', nodeTypesOrder[current], '".'].join(''),
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
