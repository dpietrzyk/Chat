import { Swal } from '../class/Swal.js';

export const changeUsernameSuccess = (socket, chatIU) => {
    socket.on('changeUsernameSuccess', ({username}) => {
        Swal.showChangeUsernameSuccessModal(username);

        chatIU.username = username;

        Cookies.set('username', username, {
            expires: 7,
        });

    });
};