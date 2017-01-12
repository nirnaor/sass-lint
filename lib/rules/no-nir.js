'use strict';

var helpers = require('../helpers');

module.exports = {
  'name': 'no-nir',
  'defaults': {},
  'detect': function (ast, parser) {
    var result = [];

    ast.traverseByType('class', function (id) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': id.start.line,
        'column': id.start.column,
        'message': 'class name nir is not allowed',
        'severity': parser.severity
      });
    });

    return result;
  }
};

