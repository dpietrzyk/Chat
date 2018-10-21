import {Swal} from '../class/Swal.js';

export const impersonateAttempt = (socket) => {
    socket.on('impersonateAttempt', ({username}) => {
        Swal.showImpersonateAttemptModal(username);
    });
};