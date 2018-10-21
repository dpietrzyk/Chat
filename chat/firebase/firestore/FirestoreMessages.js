class FirestoreMessages {

    static async fetch(messagesRef) {
        let messages = [];

        const messagesSnapshot = await messagesRef.limit(25).orderBy('date', 'desc').get();
        messagesSnapshot.forEach(doc => {
            messages.push(doc.data());
        });

        return messages.reverse();
    }

}

module.exports = FirestoreMessages;
