const express = require('express')
const app = express();
app.use(express.static('public'))
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const USERCOUNT = 10

// io.use((socket, next) => {
//     const username = socket.handshake.auth.username
//     if (!username) {
//         return next(new Error('invalid username'))
//     }
//     socket.username = username
//     next()
// })

io.on('connection', (socket) => {
    socket.emit('message', '开始建立socktet')
    // socket.broadcast.emit('message', 'To(所有人)：游客加入')
    // socket.broadcast.to('game').emit('message', 'To(game)：游客加入')
    // 发送到所有客户端，包括发件人
    // io.sockets.emit('message', "this is a test");
    // 发送到“游戏”室（频道）中的所有客户端，包括发件人
    // io.sockets.in('game').emit('message', 'cool game');

    socket.on('join', async (room) => {
        socket.join(room)
        // const myRoom = io.sockets.adapter.rooms.get(room)

        // for(const [id, socket] of io.of('/').sockets) {
            //     console.log('id: ', id)
            // }
        const users = await io.in(room).allSockets()
        const roomCount = users.size
        // const users = myRoom ? Object.keys(myRoom.sockets).length : 0
        if (roomCount < USERCOUNT) {
            socket.emit('joined', room, socket.id)
            if (roomCount > 1) {
                socket
                .to(room)
                .emit('otherjoin', room, socket.id)
            }
        } else {
            socket.leave(room)
            socket.emit('full', room, socket.id)
        }
    })

    socket.on('path', (path) => {
        // console.log(path);
        socket.to('room').emit('path', path)
    })
})

server.listen(3333, () => {
    console.log('server work 3333');
});