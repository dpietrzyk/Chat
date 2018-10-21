import {Swal} from './Swal.js';
import {ChatUITemplate} from './ChatUITemplate.js';
import {Session} from './Session.js';
import {createRoomFail} from '../socket/createRoomFail.js';
import {createRoomSuccess} from '../socket/createRoomSuccess.js';
import {createUserSuccess} from '../socket/createUserSuccess.js';
import {changeUsernameFail} from '../socket/changeUsernameFail.js';
import {changeUsernameInfo} from '../socket/changeUsernameInfo.js';
import {changeUsernameSuccess} from '../socket/changeUsernameSuccess.js';
import {createUserFail} from '../socket/createUserFail.js';
import {createMessage} from '../socket/createMessage.js';
import {createPrivateMessage} from '../socket/createPrivateMessage.js';
import {changeRoomFail} from '../socket/changeRoomFail.js';
import {changeRoomSuccess} from '../socket/changeRoomSuccess.js';
import {impersonateAttempt} from '../socket/impersonateAttempt.js';
import {invalidToken} from '../socket/invalidToken.js';
import {privateMessageUserNotFound} from '../socket/privateMessageUserNotFound.js';
import {updateRoomsList} from '../socket/updateRoomsList.js';
import {updateUsersList} from '../socket/updateUsersList.js';

export class ChatUI {

    constructor() {

        this._initVariables();
        this._initComponents();
        this._initListeners();

        this._initSession();
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }

    get sysName() {
        return this._sysName;
    }

    set sysName(sysName) {
        this._sysName = sysName;
    }

    _initVariables() {
        this._key = {
            'CTRL': {
                code: 17,
                pressed: false,

            }, 'SHIFT': {
                code: 16,
                pressed: false,

            }, 'ENTER': {
                code: 13,
                pressed: false,

            },
        };

        this._username = null;
        this._login = null;
        this._roomName = 'Chat';
        this._sysName = 'Chat';
    }


    _initComponents() {

        this._btnSubmit = document.querySelector('.send-message');
        this._inputMessage = document.querySelector('textarea[name="message"]');
        this._inputMessageMaterial = document.querySelector('textarea[name="message"] div');
        this._messagesBox = document.querySelector('.messages-box');

        this._usersCollection = document.querySelector('.users-collection');
        this._roomsCollection = document.querySelector('.rooms-collection');

        this._tabs = document.querySelector('#tabs-swipe');
        this._tooltips = document.querySelectorAll('.tooltipped');

        this._createNewRoom = document.querySelector('.create-new-room');
        this._changeUsername = document.querySelector('.change-username');

        this._navbarRoomName = document.querySelector('.navbar-room-name');
        this._dropdownTrigger = document.querySelector('.dropdown-trigger');

        this._btnLogout = document.querySelector('#logout');

        this._initReplays();

        this._initMaterialComponents();
    }

    _initReplays() {
        this._replays = document.querySelectorAll('.replay');
    }

    _initMaterialComponents() {

        M.Tabs.init(this._tabs, {
            duration: 150,
            swipeable: true,
        });

        this._scroll = new SweetScroll({
            quickMode: true,
        }, this._messagesBox);

        this._tooltips.forEach(tooltip => M.Tooltip.init(tooltip, {
            delay: 50,
            position: 'bottom',
        }));

        M.Dropdown.init(this._dropdownTrigger, {});

    }

    _initListeners() {
        this._btnSubmit.addEventListener('click', this._onSendMessageBtnClick.bind(this));
        this._inputMessage.addEventListener('keydown', this._onInputMessageKeyDown.bind(this));
        this._inputMessage.addEventListener('keyup', this._onInputMessageKeyUp.bind(this));

        this._createNewRoom.addEventListener('click', this._onCreateNewRoomClick.bind(this));
        this._changeUsername.addEventListener('click', this._onChangeUsernameClick.bind(this));

        this._btnLogout.addEventListener('click', this._onLogoutClick.bind(this));

        this._initReplaysListeners();
    }

    _initReplaysListeners() {
        this._replays.forEach(replay => replay.addEventListener('click', this._onCreatePrivateMessageClick.bind(this)));
    }

    _registerSockets() {
        changeRoomFail(this._socket);
        changeRoomSuccess(this._socket, this);
        changeUsernameFail(this._socket);
        changeUsernameInfo(this._socket, this);
        changeUsernameSuccess(this._socket, this);
        createMessage(this._socket, this);
        createPrivateMessage(this._socket, this);
        createRoomFail(this._socket);
        createRoomSuccess(this._socket, this);
        createUserFail(this._socket);
        createUserSuccess(this._socket, this);
        impersonateAttempt(this._socket);
        invalidToken(this._socket);
        privateMessageUserNotFound(this._socket, this);
        updateRoomsList(this._socket, this);
        updateUsersList(this._socket, this);
    }

    async _initSession() {
        const token = await Session.getOrCreateToken(this._socket);

        this._restoreMessages(token);

        this._socket = io(`${window.location.href}?jwt=${token}`);
        this._registerSockets();

        this._login = Session.usernameFromToken;

        this._checkAvailableSavedUser(Cookies.get('username') || Session.usernameFromToken);
    }

    async _restoreMessages(token) {
        const response = await axios.get('/messages', {headers: {'Authorization': token}});
        const messages = response.data;

        for (const message of messages) {
            const {username, msg, date, colorSet, login} = message;

            this.createMessage(
                username, msg, new Date(date), this._login === login, colorSet,
            );
        }
    }

    _onSendMessageBtnClick(e) {
        e.preventDefault();

        if (!this._username) {
            Swal.showInvalidUsernameModal(this._socket);
            return;
        }

        const msg = this._inputMessage.value;

        if (!msg.trim())
            return;

        const help = /^(\/help)$/g;
        const priv = /^(\/priv)/g;

        if (help.test(msg)) {

            const mess = `/help - show this message,
            /priv - send private message to chosen user. If you want to use this please stick to this scheme:
            
            /priv [username with space] [new line]
            [message]
            
            for example:
            /priv chat user
            Hello world!
                         
            This command sends message "Hello world!" to user with username "chat user".      
                         
            new line: Shift + Enter or Ctrl + Enter, 
            send message: Enter
            
            In the right corner of top menu you can change your username and create new room.
            If you want to change your current room, just click on the name of the room you want to join. 
            If you want to send private message to other user, simply click on his name ;) 
            
            Remember:
            If you leave the room, and there will be no other users, this room will be removed immediately. 
            `;

            this.createSystemMessage(mess);

        } else if (priv.test(msg)) {
            let firstLine = msg.split('\n')[0];
            const username = firstLine.replace('/priv', '').trim();
            const message = msg.replace(firstLine, '').trim();


            if (username && message && username !== this._username) {
                this._socket.emit('privateMessage', {
                    username,
                    message,
                });
            } else if (username === this._username) {
                this.createPrivateMessage(
                    this._sysName,
                    'Why do you want to send a message to yourself?',
                    new Date());
            }

        } else {

            this._socket.emit('message', {
                username: this._username,
                login: this._login,
                msg,
                socketID: this._socket.id,
            });
        }

        this._inputMessage.value = '';
    }

    _onInputMessageKeyDown(e) {
        if (e.keyCode === this._key.CTRL.code) {
            this._key.CTRL.pressed = true;
        } else if (e.keyCode === this._key.SHIFT.code) {
            this._key.SHIFT.pressed = true;
        }

        if (this._key.CTRL.pressed && e.keyCode === this._key.ENTER.code)
            this._inputMessage.value += '\n';

        if (!this._key.CTRL.pressed && !this._key.SHIFT.pressed && e.keyCode === this._key.ENTER.code)
            this._btnSubmit.click();
    }

    _onInputMessageKeyUp(e) {
        if (!this._key.CTRL.pressed && !this._key.SHIFT.pressed && e.keyCode === this._key.ENTER.code)
            this._inputMessage.value = '';

        if (e.keyCode === this._key.CTRL.code) {
            this._key.CTRL.pressed = false;
        } else if (e.keyCode === this._key.SHIFT.code) {
            this._key.SHIFT.pressed = false;
        }
    }

    _onCreateNewRoomClick() {
        Swal.showCreateRoomModal(this._socket);
    }

    _onChangeUsernameClick() {
        Swal.showChangeUsernameModal(this._socket);
    }

    _onJoinToRoomClick(e) {
        let el = e.target;

        while (el && el.parentNode && el.tagName.toLocaleLowerCase() !== 'li')
            el = el.parentNode;

        const roomName = el.getAttribute('data-roomname');

        if (el.getAttribute('data-roomname') !== this._roomName)
            Swal.showJoinToNewRoomModal(this._socket, this._roomName, roomName);
    }

    async _onLogoutClick(e) {
        e.preventDefault();

        Session.forgot();
        Cookies.remove('username');
        this._socket.disconnect();
        this._username = null;
        this._login = null;

        await Swal.showLogoutSuccessModal();

        this._initSession();
    }

    _onCreatePrivateMessageClick(e) {
        e.preventDefault();

        let el = e.target;

        while (!el.getAttribute('data-to') && el && el.parentNode && el.tagName.toLocaleLowerCase() !== 'li')
            el = el.parentNode;

        const to = el.getAttribute('data-to');

        if (to !== this._username) {

            this._inputMessage.value = `/priv ${to}\n`;

            if (this._inputMessage !== document.activeElement)
                this._inputMessage.focus();

        }
    }

    _checkAvailableSavedUser(username) {
        this._socket.emit('createUser', {
            username,
        });
    }

    _addNewMessage(username, msg, date, system = true, owner = false, colorSet = null, privateMessage = false, privateMessageError = false) {
        this._messagesBox.appendChild(
            ChatUITemplate.getMessageTemplate(
                username, msg, date, system, owner, colorSet, privateMessage, privateMessageError,
            ),
        );

        this._scroll.to(this._messagesBox.scrollHeight, 450);
    }

    changeRoom(roomName) {
        this._roomName = roomName;
        this._navbarRoomName.innerText = this._roomName;
    }

    createSystemMessage(msg) {
        this._addNewMessage(this._sysName, msg, new Date(), true, false, null);
    }

    createMessage(username, msg, date, owner = false, colorSet = null) {
        this._addNewMessage(username, msg, date, false, owner, colorSet);
    }

    createPrivateMessage(username, msg, date, owner = false, privateMessageError = false) {

        const colorSet = {
            color: 'black',
            hue: '',
            fontColor: 'white-text',
        };

        this._addNewMessage(username, msg, date, false, owner, colorSet, true, privateMessageError);
        this._initReplays();
        this._initReplaysListeners();
    }

    updateUsersList(users) {

        while (this._usersCollection.firstChild)
            this._usersCollection.removeChild(this._usersCollection.firstChild);

        for (let user of users) {

            const userLi = ChatUITemplate.getUserTemplate(user, user._username === this.username);

            userLi.addEventListener('click', this._onCreatePrivateMessageClick.bind(this));

            this._usersCollection.appendChild(userLi);
        }
    }

    updateRoomsList(rooms) {

        while (this._roomsCollection.firstChild)
            this._roomsCollection.removeChild(this._roomsCollection.firstChild);

        for (let room of rooms) {

            const roomLi = ChatUITemplate.getRoomTemplate(room, room._ownerUsername === this.username);

            roomLi.addEventListener('click', this._onJoinToRoomClick.bind(this));

            this._roomsCollection.appendChild(roomLi);
        }
    }

}
