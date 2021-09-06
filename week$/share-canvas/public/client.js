class Client {
    constructor() {
        const canvas = document.querySelector('canvas')
        this.canvas = canvas
        this.rect = canvas.getBoundingClientRect()
        this.ctx = canvas.getContext('2d')
        this.START = false
        this.path = {}
        this.init()
    }

    init() {
        this.initSocket()
        this.initCanvas()
    }

    initSocket() {
        const username = Math.random()
        // document.querySelector('body').innerHTML += username
        const url = 'http://localhost:3333'
        this.socket = io(url, { autoConnect: false })
        this.socket.auth = { username }

        this.socket.connect()



        this.socket.emit('join', 'room')

        this.socket.on('message', (data) => {
            console.log(data);
        })

        this.socket.on('joined', (data, id) => {
            console.log('加入房间：', data, id);
        })

        this.socket.on('otherjoin', (data, id) => {
            console.log('游客加入：', data, id)
        })

        this.socket.on('full', (data) => {
            console.log(data);
        })

        this.socket.on('path', ({ hash, path }) => {
            if (!this.path[hash]) this.path[hash] = []
            this.path[hash].push(path)
            this.drow()
        })
    }

    initCanvas() {
        console.log(this.canvas)
        this.canvas.width = this.rect.width
        this.canvas.height = this.rect.height
        this.canvas.addEventListener('mousedown', (e) => {
            this.START = Math.random() + 1
            const { clientX, clientY } = e
            console.log(clientX, clientY)
            const x = clientX
            const y = clientY - this.rect.top
            this.ctx.beginPath(x, y)
            this.path[this.START] = [[x, y]]
            this.socket.emit('path', {
                hash: this.START,
                path: [
                    x,
                    y]
            })
        })

        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.START) return
            const { clientX, clientY } = e
            console.log(clientX, clientY)
            const x = clientX
            const y = clientY - this.rect.top
            this.path[this.START].push([x, y])
            this.socket.emit('path', {
                hash: this.START,
                path: [
                    x,
                    y]
            })
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        })

        this.canvas.addEventListener('mouseup', (e) => {
            this.START = false
        })
    }


    drow() {
        const { width, heigt } = this.rect
        
        this.ctx.clearRect(0, 0, width, heigt)
        for (const hash in this.path) {
            this.path[hash].forEach((point, i) => {
                if (i === 0) {
                    this.ctx.beginPath(...point)
                } else {
                    this.ctx.lineTo(...point)
                    this.ctx.stroke()
                }
            })
        }
    }

}

new Client()