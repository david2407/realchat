import styles from '../../pages/chat/styles.module.css';
import { useState, useEffect, useRef } from 'react';
import vanillaJSGif from "../giphyComponents/gift";
import { formatDateFromTimestamp} from '../../resources/utils'

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
    fillGift()
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

  const fillGift = () => {
    messagesRecieved.forEach(msg => {
      if (msg.message.includes('G_I_F_T=')) {
        const gift = msg.message.split('G_I_F_T=')[1]
        let elem = document.getElementById(msg.id)
        if (!elem) elem = document.getElementById(msg.message.split('G_I_F_T=')[1])
        if (elem) {
          elem.replaceChildren()
          vanillaJSGif(elem, gift)
        }
      }
    })
  }

  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    fillGift()
  }, [messagesRecieved])



  function sortMessagedByDate(messages) {
    return messages.sort((a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__))
  }


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
          <div className={styles.msgText} id={!msg.id ? msg.message.split('G_I_F_T=')[1] : msg.id}>
            {msg.message}

          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;