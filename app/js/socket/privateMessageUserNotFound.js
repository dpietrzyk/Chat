export const privateMessageUserNotFound = (socket, chatUI) => {
    socket.on('privateMessageUserNotFound', ({username}) => {
        chatUI.createPrivateMessage(
            chatUI.sysName, `There is no user with username ${username}`, new Date(), false, true,
        );
    });
};