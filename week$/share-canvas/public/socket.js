const username = Math.random()
document.querySelector('body').innerHTML += name
const url = 'http://localhost:3333'
const socket = io(url, { autoConnect: false })
socket.auth = { username }

socket.connect()



socket.emit('join', 'room')

socket.on('message', (data) => {
    console.log(data);
})

socket.on('joined', (data) => {
    console.log('加入房间：' + data);
})

socket.on('otherjoin', (data) => {
    console.log('游客加入：', data);
})

socket.on('full', (data) => {
    console.log(data);
})

socket.on('path', (data) => {
    console.log(data);
})


export default socket