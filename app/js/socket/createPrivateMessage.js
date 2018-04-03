export const createPrivateMessage = (socket, chatUI) => {
    socket.on('createPrivateMessage', ({username, msg, date}) => {
        chatUI.createPrivateMessage(
            username, msg, date, chatUI.username === username,
        );
    });
};