export const updateUsersList = (socket, chatUI) => {
    socket.on('updateUsersList', users => {
        chatUI.updateUsersList(users);
    });
};