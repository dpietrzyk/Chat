import {Swal} from '../class/Swal.js';

export const createUserFail = (socket) => {
    socket.on('createUserFail', ({username}) => {
        Swal.showChangeUsernameFailModal(socket, username);
    });
};