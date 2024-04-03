/*
  A fibonacci number is a number that is defined as the sum of the previous two previous fibonacci numbers. 
  So fibonacci(3) is equal to fibonacci (2) + fibonacci (1). 
  So the answer to fibonacci (100) is fibonacci (99) + fibonacci (98).
  To generalize this,
  fibonacci (n) = fibonacci(n - 1) + fibonacci (n - 2)

  This is a recursively defined problem.
*/

function fibonacci(n) {
  if (n === 2 || n === 1) return 1
  else if (n <= 0) return 0

  return fibonacci(n - 1) + fibonacci(n - 2)
}

// Non recursive version of Fibonacci
// function fibonacci(n) {
//   const sequence = [0, 1]
//   for (let i = 2; i < n + 1; i++) {
//     sequence.push(sequence[i - 2] + sequence[i - 1])
//   }
//   console.log(sequence)
//   return sequence[n]
// }

// unit tests
// do not modify the below code
test('fibonacci', () => {
  expect(fibonacci(1)).toEqual(1)
  expect(fibonacci(2)).toEqual(1)
  expect(fibonacci(3)).toEqual(2)
  expect(fibonacci(4)).toEqual(3)
  expect(fibonacci(5)).toEqual(5)
  expect(fibonacci(6)).toEqual(8)
  expect(fibonacci(10)).toEqual(55)
})
