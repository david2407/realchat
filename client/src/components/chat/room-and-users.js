// client/src/pages/chat/room-and-users.js

import styles from '../../pages/chat/styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const RoomAndUsers = ({ socket }) => {
  const [roomUsers, setRoomUsers] = useState([]);
 
  const {room, nickname, username} = useSelector((state) => state.chat.value);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      setRoomUsers(data);
      localStorage.users = JSON.stringify(...data)
    });

    return () => socket.off('chatroom_users');
  }, [socket]);


  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { nickname, room, __createdtime__ });
    localStorage.removeItem("users");
    navigate('/', { replace: true });
  };


  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{`${room} ROOM`}</h2>

      <div className={styles.roomDiv}>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers && roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.nickname}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline' onClick={leaveRoom}>
        Leave {room} Room
      </button>
    </div>
  );
};

export default RoomAndUsers;