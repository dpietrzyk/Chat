const changeRoom = (socket, chat) => {

    socket.on('changeRoom', ({roomName}) => {

        roomName = roomName.trim();

        const exist = chat.isRoomExist(roomName);

        if (exist) {
            socket.emit('changeRoomSuccess', {roomName});
            chat.joinUserToRoom(roomName, socket);
            chat._io.emit('updateUsersList', chat.users);
            chat._io.emit('updateRoomsList', chat.rooms);
        } else {
            socket.emit('changeRoomFail', {roomName});
        }
    });

};

module.exports = changeRoom;