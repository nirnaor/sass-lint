'use strict';

var lint = require('./_lint');

var testCases = [
  { warningCount: 0, options: { order: [] } },
  { warningCount: 0, options: {} },
  { warningCount: 0, options: { order: ['includeWithoutBlock', 'declaration', 'includeWithBlock'] } },
  { warningCount: 1, options: { order: ['declaration', 'includeWithoutBlock', 'includeWithBlock'] } },
  { warningCount: 2, options: { order: ['includeWithBlock', 'declaration', 'includeWithoutBlock'] } }
];

var fileTypes = ['scss', 'sass'];

fileTypes.forEach(function (fileType) {
  describe.only('no-nir - ' + fileType, function () {
    var file = lint.file('no-nir.' + fileType);

    testCases.forEach(function (test) {
      it('' + test.desc, function (done) {
        lint.test(file, {
          'no-nir': [1, test.options]
        }, function (data) {
          lint.assert.equal(test.warningCount, data.warningCount);
          done();
        });
      });
    });

    it('enforce', function (done) {
      lint.test(file, {
        'no-nir': 1
      }, function (data) {
        lint.assert.equal(0, data.warningCount);
        done();
      });
    });

  });
});
