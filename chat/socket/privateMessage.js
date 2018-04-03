const privateMessage = (socket, chat) => {
    socket.on('privateMessage', ({username, message}) => {

        username = username.trim();
        message = message.trim();
        const toUser = chat.findUserByUsername(username);
        const fromUser = chat.findUserBySocketID(socket.id);

        if (toUser && fromUser) {

            chat._io.to(fromUser.privateRoomHash).emit('createPrivateMessage', {
                username: fromUser.username,
                msg: message,
                date: new Date(),
            });

            chat._io.to(toUser.privateRoomHash).emit('createPrivateMessage', {
                username: fromUser.username,
                msg: message,
                date: new Date(),
            });

        } else {

            chat._io.to(fromUser.privateRoomHash).emit('privateMessageUserNotFound', {
                username,
            });

        }
    });

};

module.exports = privateMessage;