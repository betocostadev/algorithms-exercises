/*
Think of the maze as a graph where each cell is a node.
The edges are the possible moves from one cell to another.
The weight of the edges is the distance between the cells.
The distance between two cells is 1 if they are adjacent and 2 if they are diagonal.
We need to find the best solution since the X would be a blocked Path.

• 1 • • • •
1 A 1 • • •
• 1 • • • •
• X X X X X
• • 1 • • •
• 1 B 1 • •

*/

// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require('./logger')

// We are not going to the use the Djikstra's algorithm here
// But we are going to use something very close to it.
// We are going to use breath first pathfinding algorithm
const NO_ONE = 0
const BY_A = 1
const BY_B = 2

function generateVisited(maze) {
  const visited = []
  for (let y = 0; y < maze.length; y++) {
    const yAxis = []
    for (let x = 0; x < maze[y].length; x++) {
      const coordinate = {
        closed: maze[y][x] === 1,
        length: 0,
        openedBy: NO_ONE,
        x,
        y,
      }
      yAxis.push(coordinate)
    }
    visited.push(yAxis)
  }
  return visited
}

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  // code goes here
  const visited = generateVisited(maze)
  visited[yA][xA].openedBy = BY_A
  visited[yB][xB].openedBy = BY_B

  const aQueue = [visited[yA][xA]]
  const bQueue = [visited[yB][xB]]
  let iteration = 0

  // logMaze(visited)

  while (aQueue.length && bQueue.length) {
    // Go as far as possible until we find the answer
    iteration++

    // Gather aNeighbors
    let aNeighbors = []
    while (aQueue.length) {
      const coordinate = aQueue.shift()
      aNeighbors = aNeighbors.concat(
        getNeighbors(visited, coordinate.x, coordinate.y)
      )
    }

    // Process aNeighbors
    for (let i = 0; i < aNeighbors.length; i++) {
      const neighbor = aNeighbors[i]
      if (neighbor.openedBy === BY_B) {
        return neighbor.length + iteration
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration
        neighbor.openedBy = BY_A
        aQueue.push(neighbor)
      }
    }

    // Gather bNeighbors
    let bNeighbors = []
    while (bQueue.length) {
      const coordinate = bQueue.shift()
      bNeighbors = bNeighbors.concat(
        getNeighbors(visited, coordinate.x, coordinate.y)
      )
    }

    // Process bNeighbors
    for (let i = 0; i < bNeighbors.length; i++) {
      const neighbor = bNeighbors[i]
      if (neighbor.openedBy === BY_A) {
        return neighbor.length + iteration
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration
        neighbor.openedBy = BY_B
        bQueue.push(neighbor)
      }
    }
    // logMaze(visited)
  }
  // We didn't find a path
  return -1
}

const getNeighbors = (visited, x, y) => {
  const neighbors = []

  // left
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    neighbors.push(visited[y - 1][x])
  }

  // right
  if (y + 1 < visited[0].length && !visited[y + 1][x].closed) {
    neighbors.push(visited[y + 1][x])
  }

  // up
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    neighbors.push(visited[y][x - 1])
  }

  // down
  if (x + 1 < visited.length && !visited[y][x + 1].closed) {
    neighbors.push(visited[y][x + 1])
  }

  return neighbors
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe('pathfinding – happy path', function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ]
  it('should solve a 4x4 maze', () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6)
  })

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0],
  ]
  it('should solve a 6x6 maze', () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7)
  })

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2],
  ]
  it('should solve a 8x8 maze', () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16)
  })

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  it('should solve a 15x15 maze', () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(78)
  })
})

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe('pathfinding – edge cases', function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ]
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1)
  })

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2],
  ]
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1)
  })
})
