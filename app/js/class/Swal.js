export class Swal {

    static showCreateUserModal(socket) {

        swal({
            title: 'Enter your nickname',
            input: 'text',

            showCancelButton: false,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,

            preConfirm: username => {

                if (!username.trim()) {
                    // NOTE: hack for show swal after closing previous one
                    setTimeout(() => {
                        Swal.showInvalidUsernameModal(socket);
                    }, 150);

                } else {
                    socket.emit('createUser', {username});
                    // NOTE: hack for not closing modal after confirm
                    return new Promise(() => {});
                }
            },
        });
    }


    static showChangeUsernameModal(socket) {

        swal({
            title: 'Enter your new username',
            input: 'text',

            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,

            preConfirm: username => {

                if (!username.trim()) {

                    // NOTE: hack for show swal after closing another swal
                    setTimeout(() => {
                        Swal.showInvalidUsernameModal(socket);
                    }, 150);

                } else {
                    socket.emit('changeUsername', {username});
                    // NOTE: hack for not closing modal after confirm
                    return new Promise(() => {});
                }
            },
        });
    }


    static showCreateUsernameSuccessModal(username) {
        swal({
            type: 'success',
            title: 'Username available',
            text: `Your nickname: ${username}`,

            allowOutsideClick: false,
        });
    }


    static showChangeUsernameFailModal(socket) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'This username is already using, try again',

            allowOutsideClick: false,

            onClose: () => Swal.showCreateUserModal(socket),
        });
    }


    static showChangeUsernameSuccessModal(username) {
        swal({
            type: 'success',
            title: 'You have successfully changed the nickname',
            text: `Your new nickname: ${username}`,

            allowOutsideClick: false,
        });
    }


    static showChangeUsernameUserNotFoundModal() {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'We have a problem, you probably do not exist, try again..',

            allowOutsideClick: false,
        });
    }


    static showInvalidUsernameModal(socket) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'You must have a username to using this chat!',

            allowOutsideClick: false,

            onClose: () => Swal.showCreateUserModal(socket),
        });
    }


    static showCreateRoomModal(socket) {

        swal({
            title: 'Enter name of your room',
            input: 'text',

            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,

            preConfirm: room => {

                if (!room.trim()) {

                    // NOTE: hack for show swal after closing another swal
                    setTimeout(() => {
                        Swal.showInvalidRoomNameModal(socket);
                    }, 150);

                } else {
                    socket.emit('createRoom', {room});
                    // NOTE: hack for not closing modal after confirm
                    return new Promise(() => {});
                }
            },
        });
    }

    static showJoinToNewRoomModal(socket, oldRoomName, newRoomName) {
        swal({
            title: `Do u want to join to ${newRoomName} and leave ${oldRoomName}`,
            text: 'Remember, room without users will be removed immediately.',
            type: 'warning',

            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Join to ${newRoomName}`,
            cancelButtonText: `Stay in to ${oldRoomName}`,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,

            preConfirm: () => {

                socket.emit('changeRoom', {roomName: newRoomName});
                // NOTE: hack for not closing modal after confirm
                return new Promise(() => {});
            },

        });

    }


    static showCreateRoomSuccessModal(roomName) {
        swal({
            type: 'success',
            title: 'Room name available',
            text: `Your new room: ${roomName}`,

            allowOutsideClick: false,
        });
    }


    static showCreateRoomFailModal(socket, roomName) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: `Name ${roomName} is currently using, try again with different name`,

            allowOutsideClick: false,

            onClose: () => Swal.showCreateRoomModal(socket),
        });
    }


    static showChangeRoomSuccessModal(roomName) {
        swal({
            type: 'success',
            title: 'You have successfully changed the room',
            text: `Your new room: ${roomName}`,

            allowOutsideClick: false,
        });
    }


    static showChangeRoomFailModal(roomName) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: `We have a problem, ${roomName} does not exist, try again..`,

            allowOutsideClick: false,
        });
    }


    static showInvalidRoomNameModal(socket) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Room must have a name..',

            allowOutsideClick: false,

            onClose: () => Swal.showCreateRoomModal(socket),
        });
    }


    static showImpersonateAttemptModal(username) {
        swal({
            type: 'error',
            title: 'Oops... Impersonate Attempt Detected',
            text: `Why do you want to impersonate ${username}? Do u want to be banned?`,

            allowOutsideClick: false,
        });
    }


}