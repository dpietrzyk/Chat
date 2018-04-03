import { Swal } from '../class/Swal.js';

export const changeUsernameFail = (socket) => {
    socket.on('changeUsernameFail', ({username, available}) => {
        if (available)
            Swal.showChangeUsernameFailModal(username);
        else
            Swal.showChangeUsernameUserNotFoundModal();

    });
};