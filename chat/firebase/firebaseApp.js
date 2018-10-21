const admin = require('firebase-admin');
const serviceAccount = require('./../../serviceAccountKey.json');

class FirebaseApp {

    get usersRef() {
        return this._usersRef;
    }

    get messagesRef() {
        return this._messagesRef;
    }

    init() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://dpietrzyk-chat.firebaseio.com',
        });

        admin.firestore().settings({
            timestampsInSnapshots: true,
        });

        this._firestore = admin.firestore();

        this._usersRef = this._firestore.collection('users');
        this._messagesRef = this._firestore.collection('messages');
    }

}

module.exports = FirebaseApp;
