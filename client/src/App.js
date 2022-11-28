import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import { useState } from 'react'
import { io } from "socket.io-client";
import Chat from './pages/chat'
import { useEffect } from 'react';

const socket = io()

function App() {
 
  const [roomsArray, setRoomsArray] = useState([])

  useEffect(() => {
    socket.on('get_rooms', (rooms) => {
      setRoomsArray(JSON.parse(rooms))
    })
    return () => socket.off('get_rooms')
}, [])

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home socket={socket} roomsArray={roomsArray} />} />
          <Route path="/chat" element={<Chat  socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
