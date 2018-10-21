const FirestoreMessage = require('./../firebase/firestore/FirestoreMessage');

const message = (socket, chat) => {
  socket.on('message', async ({username, msg, socketID}) => {

    username = username.trim();
    msg = msg.trim();

    const user = chat.findUserBySocketID(socketID);


    if (user && user.username === username) {

      const messageObj = {
        username, msg,
        date: Date.now(),
        colorSet: user.colorSet
      };

      chat._io.to(user.room).emit('createMessage', messageObj);

      await FirestoreMessage.create(chat.firebaseApp.messagesRef, messageObj);

    } else {

      chat._io.emit('impersonateAttempt', {
        username,
      });

    }
  });

};

module.exports = message;
