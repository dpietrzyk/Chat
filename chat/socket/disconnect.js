const disconnect = (socket, chat) => {

    socket.on('disconnect', () => {

        chat.removeUser(socket);
        chat._io.emit('updateUsersList', chat.users);
        chat._io.emit('updateRoomsList', chat.rooms);

    });

};

module.exports = disconnect;