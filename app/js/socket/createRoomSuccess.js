import {Swal} from '../class/Swal.js';

export const createRoomSuccess = (socket, chatUI) => {
    socket.on('createRoomSuccess', ({roomName}) => {
        chatUI.changeRoom(roomName);
        chatUI.createSystemMessage(`Room switched to ${roomName}`);
        Swal.showCreateRoomSuccessModal(roomName);
    });
};