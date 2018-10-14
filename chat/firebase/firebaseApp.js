const admin = require('firebase-admin');
const serviceAccount = require('./../../serviceAccountKey.json');

class FirebaseApp {

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
    }

    get usersRef() {
        return this._usersRef;
    }

}

module.exports = FirebaseApp;
