import React, { useState } from 'react'
import { io } from 'socket.io-client'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Context } from '../context/context'
import { Welcome } from './welcome/Welcome'
import { BASE_URL } from '../contsants/baseUrl'
import { Home } from './main/Home'
import { Room } from './room/Room'

const socket = io(BASE_URL)

function App() {
  const [user, setUser] = useState<string>('')

  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          user,
          setUser,
        }}
      >
        <h2 className='px-2 pt-2 d-flex justify-content-center'>Tic-tac-toe</h2>
        <Container className='px-2 d-flex flex-column justify-content-center align-items-center'>
          <Routes>
            <Route path='/' element={<Welcome socket={socket} />}></Route>
            <Route>
              <Route
                path='/home'
                element={user ? <Home socket={socket} /> : <Navigate to='/' />}
              ></Route>
              <Route
                path='/home/room/:id'
                element={user ? <Room socket={socket} /> : <Navigate to='/' />}
              ></Route>
            </Route>
          </Routes>
        </Container>
      </Context.Provider>
    </BrowserRouter>
  )
}

export default App
