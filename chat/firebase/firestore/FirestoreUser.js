class FirestoreUser {

    static async get(usersRef, username) {
        let user;
        const UserSnapshot = await usersRef.where('name', '==', username).get();
        UserSnapshot.forEach(doc => {
            user = doc.data();
        });

        if (user)
            return user;

        throw new Error('User not found');
    }

}

module.exports = FirestoreUser;
