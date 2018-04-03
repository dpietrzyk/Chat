import { Swal } from '../class/Swal.js';

export const changeRoomSuccess = (socket, chatUI) => {
    socket.on('changeRoomSuccess', ({roomName}) => {
        chatUI.changeRoom(roomName);
        chatUI.createSystemMessage(`Room switched to ${roomName}`);
        Swal.showChangeRoomSuccessModal(roomName);
    });
};