export const createMessage = (socket, chatUI) => {
    socket.on('createMessage', ({username, msg, date, colorSet}) => {
        chatUI.createMessage(
            username, msg, date, chatUI.username === username, colorSet,
        );
    });
};