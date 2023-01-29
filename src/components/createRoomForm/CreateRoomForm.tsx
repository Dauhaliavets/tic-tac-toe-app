import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export const CreateRoomForm = ({ socket }: { socket: Socket }) => {
  const [roomName, setRoomName] = useState<string>('')
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    socket.emit('createRoom', { roomName })
    navigate(`/home/room/${roomName}`)
  }

  return (
    <Form className='w-75 d-flex justify-content-around align-items-center' onSubmit={handleSubmit}>
      <Form.Group className='w-75'>
        <Form.Control
          type='text'
          value={roomName}
          onChange={handleChange}
          placeholder='Enter room name'
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!roomName}>
        Create
      </Button>
    </Form>
  )
}
