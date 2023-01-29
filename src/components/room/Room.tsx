import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { defaultBoard } from '../../contsants/gameConstants'
import { useGameEngine } from '../../hooks/useGameEngine'
import cross from '../../assets/cross.png'
import cycle from '../../assets/cycle.png'

export const Room = ({ socket }: { socket: Socket }) => {
  const [playerType, setPlayerType] = useState<string | null>(null)
  const [isBlockedMove, setIsBlockedMove] = useState<boolean>(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const { board, setBoard, winner, isDraw, resetGame, getUpdatedBoard } = useGameEngine()

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', { roomName: id })
    navigate('/home')
  }

  const handleClickCell = (cell: string, cellInd: number) => {
    const isEmptyCell = !cell.length
    if (isEmptyCell) {
      const newBoard = getUpdatedBoard(cellInd, playerType as string)
      setBoard(newBoard)
      setIsBlockedMove(true)
      socket.emit('move', { newBoard })
    }
  }

  const handleClickReset = () => {
    resetGame()
    socket.emit('move', { newBoard: defaultBoard })
  }

  useEffect(() => {
    socket.on('createdRoom', ({ type }) => {
      setPlayerType(type)
    })

    socket.on('joinedToRoom', ({ type }) => {
      setPlayerType(type)
    })

    socket.on('updateGame', (newBoard) => {
      setBoard(newBoard)
      setIsBlockedMove(false)
    })

    socket.on('rivalLeftRoom', () => {
      resetGame()
      setPlayerType('X')
    })

    return () => {
      socket.off('createdRoom')
      socket.off('joinedToRoom')
      socket.off('updateGame')
      socket.off('rivalLeftRoom')
    }
  }, [socket])

  return (
    <Container className='d-flex flex-column'>
      <h4>Room: {id}</h4>
      <Button className='align-self-start' onClick={handleLeaveRoom}>
        Leave room
      </Button>
      <Container
        style={{
          width: '300px',
          height: '300px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          position: 'relative',
          gap: '3px',
          padding: '0px',
        }}
      >
        {board.map((cell, ind) => (
          <Card
            key={ind}
            style={{ width: '98px', height: '98px' }}
            onClick={() => handleClickCell(cell, ind)}
          >
            {cell === 'X' ? (
              <Image src={cross} style={{ height: '98px', width: '98px' }} />
            ) : cell === 'O' ? (
              <Image src={cycle} style={{ height: '98px', width: '98px' }} />
            ) : (
              cell
            )}
          </Card>
        ))}
        {(isBlockedMove || winner || isDraw) && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: '100%',
              backgroundColor: '#27282220',
            }}
          ></div>
        )}
      </Container>
      {(winner || isDraw) && (
        <Container className='d-flex flex-column mt-2'>
          {(winner && <h3 className='text-center'>{`Winner ${winner}`}</h3>) ||
            (isDraw && <h3 className='text-center'>{`Draw - ${isDraw}`}</h3>)}
          <Button className='align-self-center' onClick={handleClickReset}>
            Reset
          </Button>
        </Container>
      )}
    </Container>
  )
}
