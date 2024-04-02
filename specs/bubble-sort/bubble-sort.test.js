/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
  
  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

function bubbleSort(nums) {
  // code goes here
  let swapped = false
  let size = nums.length
  do {
    swapped = false
    for (let i = 0; i < size; i++) {
      if (nums[i] > nums[i + 1]) {
        let selected = nums[i]
        nums[i] = nums[i + 1]
        nums[i + 1] = selected
        swapped = true
      }
    }
    // reduce the size of the array by 1 - we know the last element is in the correct place
    size--
  } while (swapped)
  return nums
}

// unit tests
// do not modify the below code
test('bubble sort', function () {
  const nums = [10, 14, 3, 11, 8, 2, 12, 13, 5, 6, 4, 7, 15, 9, 1, 0]
  const sortedNums = bubbleSort(nums)
  expect(sortedNums).toEqual([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ])
})
