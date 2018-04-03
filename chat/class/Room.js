const Color = require('./Color');

class Room {
    constructor(name, ownerUsername, colorSet = null) {
        this._numberOfUsers = 0;
        this._name = name;
        this._ownerUsername = ownerUsername;
        this._colorSet = colorSet || Color.getRandomColorHueAndFontColor();
    }

    get ownerUsername() {
        return this._ownerUsername;
    }

    set ownerUsername(username) {
        this._ownerUsername = username;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get colorSet() {
        return this._color;
    }

    set colorSet(colorSet) {
        this._color = colorSet;
    }

    get numberOfUsers() {
        return this._numberOfUsers;
    }

    userConnected() {
        this._numberOfUsers++;
    }

    userDisconnected() {
        this._numberOfUsers--;
    }

}

module.exports = Room;