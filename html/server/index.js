const app = require("express");

const server = require("http").createServer(app)

const whitelist = ["http://localhost:443","htpp://localhost:80","http://localhost"]
const whitelistIP = ["http://192.168.0.97:80"]

const io = require("socket.io")(server, {
  cors: { origin:"*" },

});

const PORT = 3001;

io.on("connection", socket =>{
    console.log("User conectado", socket.id)
	let adrr = socket.handshake.headers.host;
	console.log(adrr)	
    socket.on("disconnect", reason => {
        console.log("Usuario desconectado", socket.id)
    })
    socket.on("set_username", username =>{
        socket.data.username = username
        console.log(socket.data.username)
    })

    socket.on("message", text =>{
        io.emit("receive_message", {
            text,
            authorID: socket.id,
            author : socket.data.username
        })
    })
})

server.listen(PORT,() => console.log(`server running... On PORT  ${PORT}`))

