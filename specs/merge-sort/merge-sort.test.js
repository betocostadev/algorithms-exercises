/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  // Base case: return if length === 1 || length === 0
  if (nums.length < 2) return nums
  // Divide and conquer
  // Break into left and right parts of the array

  const length = nums.length
  const middle = Math.floor(length / 2)
  const left = nums.slice(0, middle)
  const right = nums.slice(middle)

  const sortedLeft = mergeSort(left)
  const sortedRight = mergeSort(right)

  // return the merge of left and right
  return merge(sortedLeft, sortedRight)
}

const merge = (left, right) => {
  // console.log('received left: ', left)
  // console.log('received right: ', right)
  const results = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      results.push(left.shift())
    } else {
      results.push(right.shift())
    }
  }

  // return one sorted array
  return results.concat(left, right)
}

// unit tests
// do not modify the below code
test('merge sort', function () {
  const nums = [10, 5, 3, 8, 12, 2, 6, 4, 7, 11, 9, 1]
  const ans = mergeSort(nums)
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
})
