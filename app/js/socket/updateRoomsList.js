export const updateRoomsList = (socket, chatUI) => {
    socket.on('updateRoomsList', rooms => {
        chatUI.updateRoomsList(rooms);
    });
};