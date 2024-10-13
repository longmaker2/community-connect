const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000",
    }
})

let activeUsers = [];

io.on('connection', (socket)=> {
    console.log('a user connected', socket.id);
    socket.on('new-user', (userId) => {
        if(!activeUsers.some(user => user.userId === userId)) {
            activeUsers.push({
                userId,
                socketId: socket.id
            })
        }
        socket.emit('get-active-user', activeUsers)
    })
    

    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        const user = activeUsers?.find(user => user.userId === receiverId);
        console.log(senderId, receiverId, text);
        io.to(user?.socketId).emit('getMessage', {
            senderId,
            text
        })
    })
    
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        activeUsers = activeUsers.filter(user => user.socketId !== socket.id)
        socket.emit('get-active-user', activeUsers)
    })
})
