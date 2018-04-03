const createRoom = (socket, chat) => {

    socket.on('createRoom', ({room: roomName}) => {

        roomName = roomName.trim();

        const available = chat.isRoomNameAvailable(roomName);

        if (available) {
            socket.emit('createRoomSuccess', {roomName});
            chat.addRoom(roomName, socket);
            chat.joinUserToRoom(roomName, socket);
            chat._io.emit('updateUsersList', chat.users);
            chat._io.emit('updateRoomsList', chat.rooms);
        } else {
            socket.emit('createRoomFail', {roomName});
        }
    });

};

module.exports = createRoom;