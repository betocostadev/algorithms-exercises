import React from 'react'
import './tree.css'
import { TreeViz } from './tree-visualizer'
import _ from 'lodash'

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

export default function TreeComponent() {
  const nums = _.shuffle(_.range(40))
  const tree = new Tree()
  nums.map((num) => tree.add(num))
  const objs = tree.toObject()
  return <TreeViz root={objs} />
}
