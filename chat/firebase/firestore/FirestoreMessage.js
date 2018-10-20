class FirestoreMessage {

  static async create(messagesRef, messageObj) {
    await messagesRef.add(messageObj);
  }

}

module.exports = FirestoreMessage;

