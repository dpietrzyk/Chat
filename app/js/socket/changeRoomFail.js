import {Swal} from '../class/Swal.js';

export const changeRoomFail = (socket) => {
    socket.on('changeRoomFail', ({roomName}) => {
        Swal.showChangeRoomFailModal(roomName);
    });
};