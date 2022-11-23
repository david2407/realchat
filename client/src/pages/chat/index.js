import styles from './styles.module.css'
import MessagesRecived from './messages'
import SendMessage from './send-message'
import RoomAndUsersColumn from './room-and-users'

const Chat = ({ socket, room, username }) => {
    return (
        <div className={styles.chatContainer}>
            <RoomAndUsersColumn socket={socket} username={username} room={room}/>
            <div>
                <MessagesRecived socket={socket} />
                <SendMessage socket={socket} username={username} room={room} />
            </div>
        </div>
    )
}

export default Chat