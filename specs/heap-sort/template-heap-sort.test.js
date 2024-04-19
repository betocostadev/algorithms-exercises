// Heap-sort is an array that represents a tree like data structure. It is a complete binary tree.
// Heap sort is a comparison-based sorting algorithm. It is part of the selection sort family.
// It is similar to selection sort, where we first find the maximum element and place the maximum element at the end.
// We repeat the same process for the remaining elements.
// Do not write your code here, copy this file.

/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  // code
  return array
}

const createMaxHeap = (array) => {
  // code
}

const swapPlace = (index1, index2, array) => {
  // code
}

const heapify = (array, index, heapSize) => {
  // code
}

// unit tests
// do not modify the below code
test.skip('Template heap sort', function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1]
  heapSort(nums)
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
