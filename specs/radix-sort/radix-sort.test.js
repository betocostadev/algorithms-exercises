/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
function getDigit(number, place, longestNumber) {
  const string = number.toString()
  const size = string.length

  const mod = longestNumber - size
  return string[place - mod] || 0
}

function getLongestNumber(array) {
  let longest = 0
  for (let i = 0; i < array.length; i++) {
    const currentLength = array[i].toString().length
    longest = currentLength > longest ? currentLength : longest
  }

  return longest
}

function radixSort(array) {
  // find longest number
  const longestNumber = getLongestNumber(array)
  // create how many buckets you need
  // an array of 10 arrays
  const buckets = new Array(10).fill().map(() => [])

  // for loop for how many iterations you need
  for (let i = longestNumber - 1; i >= 0; i--) {
    // while loop: enqueue the numbers into their buckets
    while (array.length) {
      const current = array.shift()
      buckets[getDigit(current, i, longestNumber)].push(current)
    }
    // for loop for each bucket
    // console.log(buckets)
    for (let j = 0; j < buckets.length; j++) {
      // dequeue all of the results
      while (buckets[j].length) {
        array.push(buckets[j].shift())
      }
    }
  }

  return array
}

// unit tests
// do not modify the below code
describe('radix sort', function () {
  it('should sort correctly', () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 3003, 17, 19, 11, 1, 100, 1244, 235, 104, 944,
      854, 34, 3000, 3001, 1200, 633,
    ]
    const ans = radixSort(nums)
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 235, 415, 633, 801, 854,
      944, 1200, 1244, 3000, 3001, 3003,
    ])
  })
  it('should sort 99 random numbers correctly', () => {
    const fill = 99
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000))
    const ans = radixSort(nums)
    expect(ans).toEqual(nums.sort())
  })
})
