import {Swal} from '../class/Swal.js';

export const invalidToken = (socket) => {
    socket.on('invalidToken', async () => {
        Cookies.remove('jwt');
        console.log('invalid token');
        Swal.showInvalidTokenModal(socket);
    });
};