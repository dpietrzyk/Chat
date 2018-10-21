const JWT = require('../class/auth/JWT');

const verifyToken = (socket) => {
    const {jwt} = socket.handshake.query;

    try {
        JWT.verify(jwt);
    } catch (e) {
        socket.emit('invalidToken');
        socket.disconnect();
    }

};

module.exports = verifyToken;
