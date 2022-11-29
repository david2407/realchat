import axios from 'axios'

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

export {harperGetMessages, helperGetRooms, harperSaveMessage}

