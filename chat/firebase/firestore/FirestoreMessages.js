class FirestoreMessages {

  static async fetch(messagesRef) {
    let messages = [];

    const messagesSnapshot = await messagesRef.limit(100).get();
    messagesSnapshot.forEach(doc => {
      messages.push(doc.data());
    });

    return messages;
  }

}

module.exports = FirestoreMessages;
