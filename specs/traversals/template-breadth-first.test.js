// Tree Traversals: Breadth First Template
// Breadth First because we go wide before we go deep.
// We go down level by level.
// Do not write your code here, copy this file.

const breadthFirstTraverse = (queue, array) => {
  // fill code in here
}

// unit tests
// do not modify the below code
describe.skip('Template breadth-first tree traversal', function () {
  const answer = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']

  const tree = {
    value: 'A',
    left: {
      value: 'B',
      left: {
        value: 'D',
        left: {
          value: 'G',
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: 'E',
        left: null,
        right: {
          value: 'H',
          left: {
            value: 'K',
            left: null,
            right: null,
          },
        },
      },
    },
    right: {
      value: 'C',
      left: {
        value: 'F',
        left: {
          value: 'I',
          left: null,
          right: null,
        },
        right: {
          value: 'J',
          left: null,
          right: null,
        },
      },
      right: null,
    },
  }

  test('breadthFirstTraverse', () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer)
  })
})
