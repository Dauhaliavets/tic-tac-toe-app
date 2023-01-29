import React, { useContext } from 'react'
import { Badge } from 'react-bootstrap'
import { Socket } from 'socket.io-client'
import { Context } from '../../context/context'
import { CreateRoomForm } from '../createRoomForm/CreateRoomForm'
import { Rooms } from '../rooms/Rooms'

export const Home = ({ socket }: { socket: Socket }) => {
  const { user } = useContext(Context)

  return (
    <>
      <h4 className='text-center'>
        Your name:{' '}
        <Badge pill bg='primary'>
          {user}
        </Badge>
      </h4>
      <CreateRoomForm socket={socket} />
      <Rooms socket={socket} />
    </>
  )
}
