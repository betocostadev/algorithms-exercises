/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  // code goes here
  constructor() {
    this.root = null
  }

  add(value) {
    if (!this.root) {
      this.root = new Node(value)
    } else {
      this.root.add(value)
    }
  }

  toObject() {
    return this.root
  }
}

// the Add logic will go on the Node class
class Node {
  // code also goes here
  constructor(value = null) {
    this.value = value
    this.left = null
    this.right = null
    this.height = 1
  }

  add(value) {
    if (value < this.value) {
      // go left
      if (this.left) {
        this.left.add(value)
      } else {
        this.left = new Node(value)
      }
      // if the left is taller than the right
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1
      }
    } else {
      // go right
      if (this.right) {
        this.right.add(value)
      } else {
        this.right = new Node(value)
      }
      // if the right is taller than the left
      if (!this.left || this.left.height < this.right.height) {
        this.height = this.right.height + 1
      }
    }
    this.balance()
  }

  balance() {
    // ask if is this node out of balance
    const rightHeight = this.right ? this.right.height : 0
    const leftHeight = this.left ? this.left.height : 0
    // if not out of balance, do nothing
    // if it is ouf of balance, do I need to single or double rotate
    if (leftHeight > rightHeight + 1) {
      const leftRightHeight = this.left?.right ? this.left.right.height : 0
      const leftLeftHeight = this.left?.left ? this.left.left.height : 0
      // if double, call rotate on child then on self
      // Double rotation
      if (leftRightHeight > leftLeftHeight) {
        this.left.rotateRR()
      }
      // Always rotate on the Node itself
      this.rotateLL()
    } else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = this.right?.right ? this.right.right.height : 0
      const rightLeftHeight = this.right?.left ? this.right.left.height : 0
      // if double, call rotate on child then on self
      // Double rotation
      if (rightLeftHeight > rightRightHeight) {
        this.right.rotateLL()
      }
      // Always rotate on the Node itself
      this.rotateRR()
    }
    // if single, just call rotate on self
  }

  rotateRR() {
    // rotate
    const valueBefore = this.value
    const leftBefore = this.left
    this.value = this.right.value
    this.left = this.right
    this.right = this.right.right
    this.left.right = this.left.left
    this.left.left = leftBefore
    this.left.value = valueBefore
    this.left.updateInNewLocation()
    this.updateInNewLocation()
  }

  rotateLL() {
    // rotate
    const valueBefore = this.value
    const rightBefore = this.right
    this.value = this.left.value
    this.right = this.left
    this.left = this.left.left
    this.right.left = this.right.right
    this.right.right = rightBefore
    this.right.value = valueBefore
    this.right.updateInNewLocation()
    this.updateInNewLocation()
  }

  updateInNewLocation() {
    // Calculate the new height
    if (!this.right && !this.left) {
      this.height = 1
    } else if (
      !this.right ||
      (this.left && this.right.height < this.left.height)
    ) {
      this.height = this.left.height + 1
    } else {
      this.height = this.right.height + 1
    }
  }
}

// unit tests
// do not modify the below code
describe('AVL Tree', function () {
  test('creates a correct tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8]
    const tree = new Tree()
    nums.map((num) => tree.add(num))
    const objs = tree.toObject()

    expect(objs.value).toEqual(4)

    expect(objs.left.value).toEqual(2)

    expect(objs.left.left.value).toEqual(1)
    expect(objs.left.left.left).toBeNull()
    expect(objs.left.left.right).toBeNull()

    expect(objs.left.right.value).toEqual(3)
    expect(objs.left.right.left).toBeNull()
    expect(objs.left.right.right).toBeNull()

    expect(objs.right.value).toEqual(7)

    expect(objs.right.left.value).toEqual(6)
    expect(objs.right.left.right).toBeNull()

    expect(objs.right.left.left.value).toEqual(5)
    expect(objs.right.left.left.left).toBeNull()
    expect(objs.right.left.left.right).toBeNull()

    expect(objs.right.right.value).toEqual(9)

    expect(objs.right.right.left.value).toEqual(8)
    expect(objs.right.right.left.left).toBeNull()
    expect(objs.right.right.left.right).toBeNull()

    expect(objs.right.right.right.value).toEqual(10)
    expect(objs.right.right.right.left).toBeNull()
    expect(objs.right.right.right.right).toBeNull()
  })
})
