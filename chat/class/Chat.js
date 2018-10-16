const morgan = require('morgan');
const bodyParser = require('body-parser');

const FirebaseApp = require('./../firebase/firebaseApp');

const User = require('./User');
const Room = require('./Room');

const changeRoomSocket = require('./../socket/changeRoom');
const changeUsernameSocket = require('./../socket/changeUsername');
const createRoomSocket = require('./../socket/createRoom');
const createUserSocket = require('../socket/createUser');
const disconnectSocket = require('./../socket/disconnect');
const messageSocket = require('../socket/message');
const privateMessageSocket = require('./../socket/privateMessage');

const express = require('express');
const path = require('path');

class Chat {
    constructor() {

        this._initVariables();
        this._initComponents();

        this._registerMiddlewares();
        this._registerRoutes();
        this._registerSockets();

        this._firebaseApp.init();
        this._initServer();

        this._firebaseApp.usersRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        });
    }

    get rooms() {
        return this._rooms;
    }

    get users() {
        let users = JSON.parse(JSON.stringify(this._users));

        users.forEach(user => delete user['_socketID']);

        return users;
    }


    get defaultRoomName() {
        return this._defaultRoomName;
    }

    _initVariables() {
        this._users = [];
        this._defaultRoomName = 'Chat';
        this._rooms = [new Room(this._defaultRoomName, null)];

        this._firebaseApp = new FirebaseApp();
    }

    _initComponents() {
        this._app = express();

        this._http = require('http').Server(this._app);

        this._io = require('socket.io')(this._http);
    }

    _registerMiddlewares() {
        this._app.use(morgan('combined'));

        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({
            extended: true,
        }));

        this._app.use(express.static(
            path.join(__dirname, './../../app'),
        ));
    }

    _registerRoutes() {
        this._app.post('/autenticate', (req, res) => {
            const {username, pass} = req.body;
            console.log(req.body);
            console.log('here');

            // TODO: generate jwt and return it! :D
            res.send('elo');
        });
    }

    _registerSockets() {
        this._io.on('connection', socket => {

            changeRoomSocket(socket, this);
            changeUsernameSocket(socket, this);
            createRoomSocket(socket, this);
            createUserSocket(socket, this);
            disconnectSocket(socket, this);
            messageSocket(socket, this);
            privateMessageSocket(socket, this);

        });
    }

    _initServer() {
        this._http.listen(3000, () => {
            console.log('Server start at http://localhost:3000');
        });
    }

    addUser(username, socketID) {
        this._users.push(
            new User(username, socketID),
        );
    }

    changeUsername(user, username) {

        this._rooms.forEach(room => {
            if (room.ownerUsername === user.username)
                room.ownerUsername = username;
        });

        user.username = username;
    }

    isUsernameAvailable(username) {
        return !this._users.find(user => user.username === username);
    }

    findUserBySocketID(socketID) {
        return this._users.find(user => user.hasThisSocketID(socketID));
    }

    findUserByUsername(username) {
        return this._users.find(user => user.username === username);
    }

    removeUser(socket) {

        const user = this.findUserBySocketID(socket.id);

        if (user) {
            this.detachUserFromRoom(user.room, socket);
            socket.leave(user.privateRoomHash);
            this._users = this._users.filter(user => !user.hasThisSocketID(socket.id));
        }

    }

    joinUserToRoom(roomName, socket) {
        const user = this.findUserBySocketID(socket.id);
        const room = this.findRoomByRoomName(roomName);

        if (user && room) {
            room.userConnected();

            if (user.room && room.name)
                this.detachUserFromRoom(user.room, socket);

            user.room = roomName;
            socket.join(roomName);
        }
    }

    joinUserToPrivateRoom(socket) {
        const user = this.findUserBySocketID(socket.id);

        if (user)
            socket.join(user.privateRoomHash);

    }

    detachUserFromRoom(roomName, socket) {
        const room = this.findRoomByRoomName(roomName);
        room.userDisconnected();

        if (!room.numberOfUsers)
            this.removeRoom(room);

        socket.leave(room.name);
    }

    addRoom(name, socket, colorSet = null) {

        const user = this.findUserBySocketID(socket.id);

        this._rooms.push(
            new Room(name, user.username, colorSet),
        );
    }

    isRoomNameAvailable(roomName) {
        return !this._rooms.find(room => room.name === roomName);
    }

    isRoomExist(roomName) {
        return !this.isRoomNameAvailable(roomName);
    }

    findRoomByRoomName(roomName) {
        return this._rooms.find(room => room.name === roomName);
    }

    removeRoom(roomToRemove) {
        if (roomToRemove.name !== this._defaultRoomName)
            this._rooms = this._rooms.filter(room => room !== roomToRemove);
    }


}

module.exports = Chat;