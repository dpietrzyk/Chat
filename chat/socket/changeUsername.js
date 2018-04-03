const changeUsername = (socket, chat) => {

    socket.on('changeUsername', ({username}) => {

        username = username.trim();

        const available = chat.isUsernameAvailable(username);
        const user = chat.findUserBySocketID(socket.id);

        if (available && user) {
            socket.emit('changeUsernameSuccess', {username});
            chat._io.emit('changeUsernameInfo', {oldUsername: user.username, username});
            chat.changeUsername(user, username);
            chat._io.emit('updateUsersList', chat.users);
            chat._io.emit('updateRoomsList', chat.rooms);
        } else {
            socket.emit('changeUsernameFail', {username, available});
        }
    });

};

module.exports = changeUsername;