import React from 'react'
import './tree.css'
import { TreeViz } from './tree-visualizer'
import _ from 'lodash'

class Tree {
  constructor() {
    this.root = null
  }

  add(value) {
    // First check it it's the first node
    if (this.root === null) {
      this.root = new Node(value)
    } else {
      let current = this.root
      while (true) {
        if (current.value > value) {
          // Go left
          if (current.left) {
            current = current.left
          } else {
            current.left = new Node(value)
            break
          }
        } else {
          // Go right
          if (current.right) {
            current = current.right
          } else {
            current.right = new Node(value)
            break
          }
        }
      }
    }
  }
  toObject() {
    return this.root
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export default function TreeComponent() {
  const nums = _.shuffle(_.range(20))
  const tree = new Tree()
  nums.map((num) => tree.add(num))
  const objs = tree.toObject()
  return <TreeViz root={objs} />
}
