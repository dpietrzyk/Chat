const message = (socket, chat) => {
    socket.on('message', ({username, msg, socketID}) => {

        username = username.trim();
        msg = msg.trim();

        const user = chat.findUserBySocketID(socketID);

        if (user && user.username === username) {

            chat._io.to(user.room).emit('createMessage', {
                username,
                msg,
                date: new Date(),
                colorSet: user.colorSet,
            });

        } else {

            chat._io.emit('impersonateAttempt', {
                username,
            });

        }
    });

};

module.exports = message;