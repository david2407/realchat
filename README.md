# CHAT APP BACKEND

Nodejs backend based server with express framework. It uses axios to get and post info into the harper database to persist data and use socket.io for streaming data between client project and server in real time.

# APP LINK

https://intotheocean.herokuapp.com/
# HOW TO USE

Yo have to enter information like nickname, username and select a room to be able to chat. The chat info is peristed into harper database cloud by user and room

You can send a gif by using key word '/giphy' and getting a word to search for

Example '/giphy cats' and press enter to show giphy carousel for selecting one by clicking

# CLIENT - FRONTEND

Build using React (create-react-app set), implements a store (redux toolkit implementation), styling with css modules and socket io client connection

image user picture is save in local storage by keys (username and roomname)

# SERVER - BACKEND

Build using Nodejs - Express server. It's using socket io for sending message events in live stream about the message info stored in harper db
# DEPLOYMENT

This is deploy into a heroku node server, the server runs an http server and it works as a static file server.

In the project there is two separated projects (client and server) but in the build step it's compiled and served 

# TEST

You can run two kind of tests
1. client side for testing render objects into screen using jest 
2. back test for testing socket io connection and disconection server

# GITHUB

This is github public linc

https://github.com/david2407/realchat


