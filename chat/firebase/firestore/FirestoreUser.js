class FirestoreUser {

    static async get(usersRef, username) {
        let user;
        const userSnapshot = await usersRef.where('name', '==', username).get();
        console.log(userSnapshot)
        userSnapshot.forEach(doc => {
            console.log('here')
            user = doc.data();
        });

        if (user)
            return user;

        throw new Error('User not found');
    }

}

module.exports = FirestoreUser;
