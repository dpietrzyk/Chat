import {Swal} from '../class/Swal.js';

export const createRoomFail = (socket) => {
    socket.on('createRoomFail', ({roomName}) => {
        Swal.showCreateRoomFailModal(socket, roomName);
    });
};