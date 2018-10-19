const JWT = require('../class/auth/JWT');

const verifyToken = (socket, token) => {

    try {
        JWT.verify(token);
    } catch (e) {
        socket.emit('invalidToken');
        socket.disconnect();
    }

};

module.exports = verifyToken;