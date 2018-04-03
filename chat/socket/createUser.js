const createUser = (socket, chat) => {

    socket.on('createUser', ({username}) => {

        username = username.trim();

        const available = chat.isUsernameAvailable(username);

        if (available) {
            socket.emit('createUserSuccess', {username});
            chat.addUser(username, socket.id);
            chat.joinUserToRoom(chat.defaultRoomName, socket);
            chat.joinUserToPrivateRoom(socket);
            chat._io.emit('updateUsersList', chat.users);
            chat._io.emit('updateRoomsList', chat.rooms);

        } else {
            socket.emit('createUserFail', {username});
        }
    });

};

module.exports = createUser;