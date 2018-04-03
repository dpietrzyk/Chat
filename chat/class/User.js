const Color = require('./Color');
const crypto = require('crypto');

class User {
    constructor(username, socketID, room = null, colorSet = null) {
        this._username = username;
        this._socketID = socketID;
        this._room = room;

        this._privateRoomHash = this._generateRandomHash(16);

        this._colorSet = colorSet || Color.getRandomColorHueAndFontColor();
    }

    get privateRoomHash() {
        return this._privateRoomHash;
    }

    get username() { return this._username; }

    set username(value) { this._username = value; }

    get room() { return this._room; }

    set room(value) { this._room = value; }

    get colorSet() { return this._colorSet; }

    set colorSet(value) { this._colorSet = value; }

    get color() { return this._colorSet.color; }

    set color(val) { this._colorSet.color = val; }

    get hue() { return this._colorSet.hue; }

    set hue(val) { this._colorSet.hue = val; }

    get fontColor() { return this._colorSet.fontColor; }

    set fontColor(val) { this._colorSet.fontColor = val; }

    hasThisSocketID(socketID) { return this._socketID === socketID; }

    _generateRandomHash(len) {
        return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex')
        .slice(0, len).toUpperCase();
    }
}

module.exports = User;