class FirestoreMessages {

    static async fetch(messagesRef) {
        let messages = [];

        const messagesSnapshot = await messagesRef.limit(100).orderBy('date', 'desc').get();
        messagesSnapshot.forEach(doc => {
            messages.push(doc.data());
        });

        return messages.reverse();
    }

}

module.exports = FirestoreMessages;
