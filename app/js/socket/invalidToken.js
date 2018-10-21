import {Swal} from '../class/Swal.js';

export const invalidToken = (socket) => {
    socket.on('invalidToken', async () => {
        Cookies.remove('jwt');
        Swal.showInvalidTokenModal(socket);
    });
};