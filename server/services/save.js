
function harperSaveMessage (message, username, room, __createdtime__) {
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

export {harperSaveMessage}