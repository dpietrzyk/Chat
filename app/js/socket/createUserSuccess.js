import {Swal} from '../class/Swal.js';

export const createUserSuccess = (socket, chatUI) => {
    socket.on('createUserSuccess', ({username}) => {

        chatUI.username = username;

        if (!Cookies.get('username') || Cookies.get('username') === '')
            Swal.showCreateUsernameSuccessModal(username);


        Cookies.set('username', username, {
            expires: 7,
        });

    });
};
