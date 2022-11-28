import styles from './styles.module.css'
import MessagesRecived from '../../components/chat/messages'
import SendMessage from '../../components/chat/send-message'
import RoomAndUsersColumn from '../../components/chat/room-and-users'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Chat = ({ socket }) => {
   
    const navigate = useNavigate();
    const { room } = useSelector((state) => state.chat.value);

    if(!room) navigate('/', { replace: true });

    return (
        <div className={styles.chatContainer}>
            <RoomAndUsersColumn socket={socket}/>
            <div className={styles.chatColumn}>
                <MessagesRecived socket={socket} />
                <SendMessage socket={socket} />
            </div>
        </div>
    )
}

export default Chat