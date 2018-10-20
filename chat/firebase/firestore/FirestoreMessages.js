class FirestoreMessages {

  static async fetch(messagesRef) {
    let messages = [];

    const messagesSnapshot = await messagesRef.get();
    messagesSnapshot.forEach(doc => {
      messages.push(doc.data());
    });

    console.log(messages);
    return messages;
  }

}

module.exports = FirestoreMessages;
