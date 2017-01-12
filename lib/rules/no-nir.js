'use strict';

const uniq = (v, i, a) => a.indexOf(v) === i

const isInclude = node => node.type === 'include'
const isIncludeWithOutContent = node => isInclude(node) && node.content.every(x => x.type !== 'block')
const isDeclaration = node => node.type === 'declaration'
const isIncludeWithContent = node => isInclude(node) && node.content.some(x => x.type === 'block')

const funcs = [isIncludeWithOutContent, isDeclaration, isIncludeWithContent]

const getOrder = node => funcs.findIndex(f => f(node))

module.exports = {
  'name': 'no-nir',
  'defaults': {},
  detect: function (ast, parser) {

    const parents = []
    ast.traverseByType('include', function (node, i, parent) {
      parents.push(parent)
    });

    parents.filter(uniq).forEach(parent => {
      const siblingsToSort = parent.content.filter(n => ['include', 'declaration'].includes(n.type))

      console.log(siblingsToSort.map(getOrder))
      console.log(siblingsToSort.map(x => funcs.map(f => f(x))).join('\n'))

      let current = 0
      siblingsToSort.forEach(node => {
        const order = getOrder(node)
        if (order < current) throw 'wrong'
        if (order > current) current = order
      })


      process.exit()
    })
    return
  }
};
