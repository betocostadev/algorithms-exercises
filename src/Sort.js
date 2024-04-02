import React from 'react'
import { shuffle, range } from 'lodash'
import { App, snapshot, done, clear } from './sort-visualizer'

import './sort.css'

function sort(nums) {
  // do cool stuff here
  // call snapshot any time you do anything to the array
  // it's okay if you call it with duplicate value array,
  // it will deduplicate for you
  // Checking with insertion sort
  snapshot(nums)
  for (let i = 1; i < nums.length; i++) {
    let numToInsert = nums[i]
    let j

    for (j = i - 1; nums[j] > numToInsert && j >= 0; j--) {
      nums[j + 1] = nums[j]
    }

    nums[j + 1] = numToInsert
    snapshot(nums)
  }
  return nums
}

export default function SortComponent() {
  clear()
  sort(shuffle(range(16)))
  done()
  return <App />
}
