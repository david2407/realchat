import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setImage, setNickname, setRoom, setUsername } from '../../store/chats/chatSlice';
import TitleComponent from '../../components/home/title'
import UserImage from '../../components/home/image'
import CustomInput from '../../components/home/customInput'
import CustomSelect from '../../components/home/customSelect'

const Home = ({ socket, roomsArray }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const title = `   Ocean Chat   `

    const [error, setError] = useState('')

    const { image, room, nickname, username } = useSelector((state) => state.chat.value);

    const clean = () => {
        dispatch(setRoom(''))
        dispatch(setImage(''))
        dispatch(setNickname(''))
        dispatch(setUsername(''))
        setError('')
    }

    useEffect(() => {
        clean()
    }, [])

    const joinRoom = () => {
        room === '' && setError('Select a Room')
        username === '' && setError('Please set a username')
        nickname === '' && setError('Please set a nickname')
        room !== '' && username !== '' && nickname !== '' && (socket.emit('join_room', { username, nickname, image, room }) && navigate('/chat', { replace: true }))
        localStorage.setItem(`${username}--${room}`, image)
       
    }



    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <TitleComponent title={title} />

                {image && <UserImage image={image} className={styles.img} />}

                <CustomInput className={styles.input} placeholder='Nickname...' onChange={(e) => dispatch(setNickname(e.target.value))}></CustomInput>

                <input type="file" id="files" className={styles.files} placeholder='User Image...' onChange={(e) => dispatch(setImage(URL.createObjectURL(e.target.files[0])))}></input>
                <label className={styles.input} for="files">Select User Image</label>

                <CustomInput className={styles.input} placeholder='Username...' onChange={(e) => dispatch(setUsername(e.target.value))}></CustomInput>

                {roomsArray && <CustomSelect className={styles.input} onChange={(e) => dispatch(setRoom(e.target.value))} roomsArray={roomsArray} />}

                <div className={styles.error}>{error}</div>

                <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinRoom}>Join Into the Ocean</button>
            </div>
        </div>
    )
}

export default Home