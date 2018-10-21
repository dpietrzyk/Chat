class FirestoreUser {

    static async get(usersRef, username) {
        let user;
        const userSnapshot = await usersRef.where('name', '==', username).get();
        userSnapshot.forEach(doc => {
            user = doc.data();
        });

        if (user)
            return user;

        throw new Error('User not found');
    }

}

module.exports = FirestoreUser;
