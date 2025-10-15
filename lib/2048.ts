// Functional 2048 core: pure functions for board creation, movement, merging, and win/lose checks.

export type Board = number[][]
export type Direction = "left" | "right" | "up" | "down"

export const createEmptyBoard = (size: number): Board =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0))

const cloneBoard = (board: Board): Board => board.map((row) => [...row])

const getEmptyCells = (board: Board): Array<[number, number]> => {
  const cells: Array<[number, number]> = []
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) cells.push([r, c])
    }
  }
  return cells
}

export const addRandomTile = (board: Board): Board => {
  const empty = getEmptyCells(board)
  if (empty.length === 0) return board
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  // 90% chance of 2, 10% chance of 4 (classic 2048 behavior)
  const value = Math.random() < 0.9 ? 2 : 4
  const next = cloneBoard(board)
  next[r][c] = value
  return next
}

export const initBoard = (size = 4): Board => {
  let b = createEmptyBoard(size)
  b = addRandomTile(b)
  b = addRandomTile(b)
  return b
}

type MoveLineResult = {
  line: number[]
  scoreGained: number
  reached2048: boolean
}

const moveLineLeft = (line: number[]): MoveLineResult => {
  const nums = line.filter((n) => n !== 0)
  const merged: number[] = []
  let score = 0
  let reached2048 = false

  for (let i = 0; i < nums.length; i++) {
    if (i < nums.length - 1 && nums[i] === nums[i + 1]) {
      const val = nums[i] * 2
      merged.push(val)
      score += val
      if (val >= 2048) reached2048 = true
      i++ // skip the next one since it's merged
    } else {
      merged.push(nums[i])
    }
  }
  while (merged.length < line.length) merged.push(0)
  return { line: merged, scoreGained: score, reached2048 }
}

const transpose = (board: Board): Board => {
  const size = board.length
  const res = createEmptyBoard(size)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      res[c][r] = board[r][c]
    }
  }
  return res
}

const reverseRows = (board: Board): Board => board.map((row) => [...row].reverse())

export const move = (
  board: Board,
  direction: Direction,
): { board: Board; moved: boolean; scoreGained: number; reached2048: boolean } => {
  let working = cloneBoard(board)
  let scoreGained = 0
  let reached2048 = false

  if (direction === "up") {
    working = transpose(working)
  } else if (direction === "down") {
    working = reverseRows(transpose(working))
  } else if (direction === "right") {
    working = reverseRows(working)
  }

  const result: Board = []
  for (const row of working) {
    const movedRow = moveLineLeft(row)
    result.push(movedRow.line)
    scoreGained += movedRow.scoreGained
    reached2048 = reached2048 || movedRow.reached2048
  }

  let finalBoard = result
  if (direction === "up") {
    finalBoard = transpose(result)
  } else if (direction === "down") {
    finalBoard = transpose(reverseRows(result))
  } else if (direction === "right") {
    finalBoard = reverseRows(result)
  }

  const moved = JSON.stringify(board) !== JSON.stringify(finalBoard)
  return { board: finalBoard, moved, scoreGained, reached2048 }
}

export const has2048 = (board: Board): boolean => board.some((row) => row.some((n) => n >= 2048))

export const canMove = (board: Board): boolean => {
  // Any empty cell?
  
  if (getEmptyCells(board).length > 0) return true
  const size = board.length
  // Any adjacent equal horizontally or vertically?
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = board[r][c]
      if (r + 1 < size && board[r + 1][c] === val) return true
      if (c + 1 < size && board[r][c + 1] === val) return true
    }
  }
  console.log("no more moves");
  return false
}

export const isGameOver = (board: Board): boolean => !canMove(board)
