import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import axios from 'axios';
import cors from "cors"


const app = express()
dotenv.config()

//socket io events
const httpServer = createServer(app);
const io = new Server(httpServer);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "../client/build")));


const CHAT_BOT = 'ChatBot'
const PORT = process.env.PORT || 4000
let chatRoom = ''
let allUsers = []

io.on('connection', socket => {
    //console.log(`User connected ${socket.id}`)

    helperGetRooms()
        .then(rooms => {
            socket.emit('get_rooms', rooms)
        }).catch(err => console.log(err))


    socket.on('join_room', (data) => {
        const { username, nickname, image, room } = data
        socket.join(room)
        console.log(room, username)

        harperGetMessages(room)
            .then(lastMessages => {
                socket.emit('last_100_messages', lastMessages)
            })
            .catch(err => console.log(err))

        let __createdtime__ = Date.now()

        chatRoom = room
        allUsers.push({ id: socket.id, username, nickname, image, room })
        const chatRoomUsers = allUsers.filter(user => user.room === room)
        socket.to(room).emit('chatroom_users', chatRoomUsers)
        socket.emit('chatroom_users', chatRoomUsers)

        socket.to(room).emit('receive_message', {
            message: `${nickname} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__
        })

        socket.emit('receive_message', {
            message: `Welcome ${nickname}`,
            username: CHAT_BOT,
            __createdtime__
        })
    })

    socket.on('send_message', (data) => {
        const { message, username, nickename, room, __createdtime__ } = data
        io.in(room).emit('receive_message', data)
        harperSaveMessage(message, username, nickename, room, __createdtime__)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    })

    socket.on('disconnect', () => {
        console.log('User disconnected from the chat');
        const user = allUsers.find((user) => user.id == socket.id);
        if (user?.username) {
            allUsers = leaveRoom(socket.id, allUsers);
            socket.to(chatRoom).emit('chatroom_users', allUsers);
            socket.to(chatRoom).emit('receive_message', {
                message: `${user.username} has disconnected from the chat.`,
            });
        }
    });

    socket.on('leave_room', data => {
        const { nickname, room } = data
        socket.leave(room)
        const __createdtime__ = Date.now()

        allUsers = leaveRoom(socket.id, allUsers)
        socket.to(room).emit('chatroom_users', allUsers)
        socket.to(room).emit('receive_message', {
            username: CHAT_BOT,
            message: `${nickname} has left the chat`,
            __createdtime__
        })
    })
})

function harperGetMessages(room) {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if (!dbUrl || !dbPw) return null;

    let data = JSON.stringify({
        operation: 'sql',
        sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`,
    });

    let config = {
        method: 'post',
        url: dbUrl,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + dbPw,
        },
        data: data,
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then(function (response) {
                resolve(JSON.stringify(response.data));
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function helperGetRooms() {
    const dbUrl = process.env.HARPERDB_URL;
    const dbPw = process.env.HARPERDB_PW;
    if (!dbUrl || !dbPw) return null;

    let data = JSON.stringify({
        operation: 'sql',
        sql: `SELECT * FROM realtime_chat_app.rooms`,
    });

    let config = {
        method: 'post',
        url: dbUrl,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + dbPw,
        },
        data: data,
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then(res => resolve(JSON.stringify(res.data)))
            .catch(error => reject(error))
    })

}

function harperSaveMessage(message, username, nickename, room, __createdtime__) {
    const dbUrl = process.env.HARPERDB_URL
    const dbPw = process.env.HARPERDB_PW

    if (!dbUrl || !dbPw) return null;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + dbPw);

    var raw = JSON.stringify({
        operation: 'insert',
        schema: 'realtime_chat_app',
        table: 'messages',
        records: [
            {
                message,
                username,
                nickename,
                room
            }
        ]
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };




    return new Promise((resolve, reject) => {
        fetch(dbUrl, requestOptions)
            .then(response => response.text())
            .then(res => resolve(res))
            .catch(error => reject(error));
    })
}

function leaveRoom(userID, chatRoomUsers) {
    return chatRoomUsers.filter(user => user.id != userID)
}


/* app.get('/', (req, res) => {
    res.send("Hi")
}) */

httpServer.listen(PORT, () => console.log("Server is running in " + PORT))