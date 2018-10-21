const Authentication = require('./../class/auth/Authentication');
const FirebaseUser = require('./../firebase/firestore/FirestoreUser');

const authenticateRoute = async (req, res) => {
  const {username, pass} = req.body;

  try {

    const user = await FirebaseUser.get(this.firebaseApp.usersRef, username);
    const token = Authentication.authenticate(user, pass);
    res.send(token);

  } catch (e) {
    res.sendStatus(401);
  }
};

module.exports = authenticateRoute;