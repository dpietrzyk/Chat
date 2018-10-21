const FirestoreMessages = require("./../firebase/firestore/FirestoreMessages.js");
const JWT = require("./../class/auth/JWT");

const messagesRoute = async (messagesRef, req, res) => {
    const {authorization} = req.headers;

    try {
        JWT.verify(authorization);
        res.send(await FirestoreMessages.fetch(messagesRef));
    } catch (e) {
        res.sendStatus(401);
    }

};

module.exports = messagesRoute;
