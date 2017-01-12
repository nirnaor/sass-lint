'use strict';

var lint = require('./_lint');

//////////////////////////////
// SCSS syntax tests
//////////////////////////////
describe.only('no-nir - scss', function () {
  var file = lint.file('no-nir.scss');

  it('enforce', function (done) {
    lint.test(file, {
      'no-nir': 1
    }, function (data) {
      lint.assert.equal(5, data.warningCount);
      done();
    });
  });

  it('[excludes: all]', function (done) {
    lint.test(file, {
      'no-nir': [
        1,
        {
          'exclude': [
            'test-again',
            'waldo',
            'mq',
            'breakpoint'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(0, data.warningCount);
      done();
    });
  });

  //////////////////////////////
  // Mixins Before Declarations - exclude certain
  // mixin test-again is not excluded
  //////////////////////////////
  it('[excludes: limited]', function (done) {
    lint.test(file, {
      'no-nir': [
        1,
        {
          'exclude': [
            'waldo',
            'mq',
            'breakpoint'
          ]
        }
      ]
    }, function (data) {
      lint.assert.equal(1, data.warningCount);
      done();
    });
  });
});

//////////////////////////////
// Sass syntax tests
//////////////////////////////
// describe.only('mixins before declarations - sass', function () {
//   var file = lint.file('no-nir.sass');
//
//   it('enforce', function (done) {
//     lint.test(file, {
//       'no-nir': 1
//     }, function (data) {
//       lint.assert.equal(5, data.warningCount);
//       done();
//     });
//   });
//
//   //////////////////////////////
//   // Mixins Before Declarations - overwrite
//   //////////////////////////////
//   it('[excludes: all]', function (done) {
//     lint.test(file, {
//       'no-nir': [
//         1,
//         {
//           'exclude': [
//             'test-again',
//             'waldo',
//             'mq',
//             'breakpoint'
//           ]
//         }
//       ]
//     }, function (data) {
//       lint.assert.equal(0, data.warningCount);
//       done();
//     });
//   });
//
//   //////////////////////////////
//   // Mixins Before Declarations - exclude certain
//   // mixin test-again is not excluded
//   //////////////////////////////
//   it('[excludes: limited]', function (done) {
//     lint.test(file, {
//       'no-nir': [
//         1,
//         {
//           'exclude': [
//             'waldo',
//             'mq',
//             'breakpoint'
//           ]
//         }
//       ]
//     }, function (data) {
//       lint.assert.equal(1, data.warningCount);
//       done();
//     });
//   });
// });
