export const changeUsernameInfo = (socket, chatUI) => {
    socket.on('changeUsernameInfo', ({oldUsername, username}) => {
        chatUI.createSystemMessage(`${oldUsername} from now on is called ${username}`);
    });
};