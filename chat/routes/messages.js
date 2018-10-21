const FirestoreMessages = require("../firebase/firestore/FirestoreMessages.js");

const messagesRoute = async (messagesRef, req, res) => {
    res.send(await FirestoreMessages.fetch(messagesRef))
};

module.exports = messagesRoute;
