import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { IRoom } from '../../models/roomModel'

export const Rooms = ({ socket }: { socket: Socket }) => {
  const [rooms, setRooms] = useState<IRoom[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('updateRooms', (data) => setRooms(data))
  }, [])

  const handleJoinToRoom = (roomName: string) => {
    socket.emit('selectRoom', { roomName })
    navigate(`/home/room/${roomName}`)
  }

  return (
    <Container
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}
      className='p-3'
    >
      {rooms.map((room) => (
        <Card key={room.name} className='d-flex border border-1 border-primary border-opacity-25'>
          <Card.Body className='d-flex flex-column'>
            <Card.Title>Room: {room.name}</Card.Title>
            Users ID:{' '}
            {room.users.map((user, ind) => (
              <Card.Subtitle key={ind}>
                {ind + 1}: {user}
              </Card.Subtitle>
            ))}
            <Button
              className='mt-3 align-self-end'
              variant='primary'
              onClick={() => handleJoinToRoom(room.name)}
              disabled={room.users.length === 2}
            >
              Join
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
}
