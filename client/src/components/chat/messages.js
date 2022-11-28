import styles from '../../pages/chat/styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { formatDateFromTimestamp, fillGift, sortMessagedByDate} from '../../resources/utils'
import {giftIdentifier} from '../../resources/constants'

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null)

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    fillGift(messagesRecieved)
    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    socket.on('last_100_messages', (last100Messages) => {
      let messages = JSON.parse(last100Messages);
      console.log(messages)
      messages = sortMessagedByDate(messages)
      setMessagesReceived(state => [...messages, ...state])
    })

    return () => socket.off('last_100_messages')
  }, [socket])


  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    fillGift(messagesRecieved)
  }, [messagesRecieved])


  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved !== [] && messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>
              <img className={styles.img}
                src={localStorage.getItem(`${msg.username}--${msg.room}`) ? localStorage.getItem(`${msg.username}--${msg.room}`) : '/images/defaultprofile.png'} 
                alt="profile pic" 
                />

              {msg.username}
            </span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p/>
          <div className={styles.msgText} id={!msg.id ? msg.message.split(`${giftIdentifier}=`)[1] : msg.id}>
            {msg.message}

          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;