// client/src/pages/chat/send-message.js
import styles from '../../pages/chat/styles.module.css';
import React, {    useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api'
import { vanillaJSCarousel } from '../../components/giphyComponents/carousel'
import { useSelector } from "react-redux";

const gf = new GiphyFetch('yH0AdrTiX36tre5ytdUZoMyBOfb7ILcx')



const SendMessage = ({ socket}) => {
  const [message, setMessage] = useState('');
  const {room, username} = useSelector((state) => state.chat.value);

  const carouselTarget = document.getElementById("carousel");

  const onClickGift = (giftID) => {
    const msg = `G_I_F_T=${giftID}`
    sendMessageToSocket(msg)
    setMessage('');
    carouselTarget.replaceChildren();
  }

  const sendMessageToSocket = (pMessage) => {
    const __createdtime__ = Date.now();
    // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server reply message to other users in room
    socket.emit('send_message', { username, room, message: pMessage, __createdtime__ });
    setMessage('');
  }


  const sendMessage = () => {
    if (message !== '') {
      if (!message.includes('/giphy')) {
        sendMessageToSocket(message)
      } else {
        const textToSearch = message.split('/giphy')[1]
        vanillaJSCarousel(carouselTarget, textToSearch, onClickGift)
      }

    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <div className={styles.sendMessageDiv}>
        <input
          className={styles.messageInput}
          placeholder='Message...'
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          value={message}
        />
        <button className='btn btn-primary' onClick={sendMessage}>
          Send Message
        </button>
      </div>
      <div className={styles.giftGrid} id="carousel" >

      </div>

    </div>
  );
};


export default SendMessage;