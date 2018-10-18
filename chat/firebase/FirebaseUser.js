class FirebaseUser {

  static async get(usersRef, username) {
    let user;
    const UserSnapshot = await usersRef.where('name', '==', username).get();
    UserSnapshot.forEach(doc => {
      user = doc.data();
    });

    return user;
  }

}

module.exports = FirebaseUser;
