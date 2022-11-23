import styles from './styles.module.css'

import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();
    const joinRoom = () => {
        room !== '' && username !== '' && (socket.emit('join_room', { username, room }) && navigate('/chat', { replace: true }))
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>{` <>PetroChat</>`}</h1>
                <input className={styles.input} placeholder='Username...' onChange={(e) => setUsername(e.target.value)}></input>

                <select className={styles.input} onChange={(e) => setRoom(e.target.value)}>
                    <option>-- Select Room --</option>
                    <option value='debates'>Debates</option>
                    <option value='politica'>Politica</option>
                    <option value='economia'>Economia</option>
                </select>

                <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    )
}

export default Home