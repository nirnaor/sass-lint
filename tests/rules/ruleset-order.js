'use strict';

var lint = require('./_lint');

var testCases = [
  { warningCount: 0, options: { order: [] } },
  { warningCount: 0, options: {} },
  { warningCount: 0, options: { order: ['includeWithoutBlock', 'identDeclaration', 'includeWithBlock'] } },
  { warningCount: 1, options: { order: ['identDeclaration', 'includeWithoutBlock', 'includeWithBlock'] } },
  { warningCount: 2, options: { order: ['includeWithBlock', 'identDeclaration', 'includeWithoutBlock'] } }
];

var fileTypes = ['scss', 'sass'];

fileTypes.forEach(function (fileType) {
  describe.only('ruleset-order - ' + fileType, function () {
    var file = lint.file('ruleset-order.' + fileType);

    testCases.forEach(function (test) {
      it('' + test.desc, function (done) {
        lint.test(file, {
          'ruleset-order': [1, test.options]
        }, function (data) {
          lint.assert.equal(test.warningCount, data.warningCount);
          done();
        });
      });
    });
  });
});
