import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import { useState } from 'react'
import { io } from "socket.io-client";
import Chat from './pages/chat'

const socket = io("http://localhost:4000")
/* {
  withCredentials: true,
  transports: ["websocket", "polling"],
  extraHeaders: {
    "my-custom-header": "abcd",
    "Access-Control-Allow-Origin": "*"
  }
}); */

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')


  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} />} />
          <Route path="/chat" element={<Chat username={username} room={room} socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
