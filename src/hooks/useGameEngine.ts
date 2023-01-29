import { useEffect, useState } from 'react'
import { defaultBoard, winningConditions } from '../contsants/gameConstants'

const useGameEngine = () => {
  const [board, setBoard] = useState<string[]>(defaultBoard)
  const [winner, setWinner] = useState<string>('')
  const [isDraw, setIsDraw] = useState<boolean>(false)

  useEffect(() => {
    checkBoard()
  }, [board])

  const checkBoard = () => {
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i]
      const a = board[winCondition[0]]
      const b = board[winCondition[1]]
      const c = board[winCondition[2]]
      if (a === '' || b === '' || c === '') {
        continue
      }
      if (a === b && b === c) {
        setWinner(a)
        break
      }
    }

    const isEmptyCell = board.includes('')
    if (!winner && !isEmptyCell) {
      setIsDraw(true)
    }
  }

  const resetGame = () => {
    setBoard(defaultBoard)
    setWinner('')
    setIsDraw(false)
  }

  const getUpdatedBoard = (cellInd: number, playerType: string) => {
    return board.map((item, ind) => {
      if (ind === cellInd) {
        return playerType
      } else {
        return item
      }
    })
  }

  return {
    board,
    setBoard,
    winner,
    setWinner,
    isDraw,
    setIsDraw,
    resetGame,
    getUpdatedBoard,
  }
}

export { useGameEngine }
