export class ChatUITemplate {
    static getMessageTemplate(username, msg, date, system = true, owner = false, colorSet = null, privateMessage = false, privateMessageError = false) {

        const {color, hue, fontColor} = colorSet || {color: 'blue-grey', hue: 'darken-1', fontColor: 'white-text'};

        const d = new Date(date);

        const row = document.createElement('div');
        row.className = 'row';

        const col = document.createElement('div');
        col.className = `col ${system ? 'rm-float' : owner ? 'right' : ''}`;
        row.appendChild(col);

        const card = document.createElement('article');
        card.className = 'card';
        col.appendChild(card);

        const cardContent = document.createElement('section');
        cardContent.className = `card-content ${color} ${hue} ${fontColor}`;
        card.appendChild(cardContent);

        const cardTitle = document.createElement('span');
        cardTitle.className = 'card-title';

        if (privateMessage) {

            cardTitle.innerText = '[PRIVATE MESSAGE]';

            const br = document.createElement('br');
            cardTitle.appendChild(br);

            cardTitle.innerText += username;

            cardContent.appendChild(cardTitle);

        } else {
            cardTitle.innerText = username;
        }
        cardContent.appendChild(cardTitle);

        const cardTitleTime = document.createElement('span');
        cardTitleTime.className = 'card-title-time';
        cardTitleTime.innerText = `${d.getHours()}:${ ('0' + d.getMinutes()).slice(-2)}`;
        cardTitle.appendChild(cardTitleTime);

        const cardMsg = document.createElement('p');
        cardMsg.innerText = msg;
        cardContent.appendChild(cardMsg);

        if (privateMessage && !privateMessageError && !owner) {

            const cardActions = document.createElement('div');
            cardActions.className = 'card-action right';

            const cardAction1 = document.createElement('a');
            cardAction1.setAttribute('href', 'javascript:void(0);');
            cardAction1.setAttribute('data-to', username);
            cardAction1.className = 'light-blue-text replay';
            cardAction1.innerText = 'replay';
            cardActions.appendChild(cardAction1);

            card.appendChild(cardActions);
        }

        return row;
    }

    static getUserTemplate({_username, _room, _colorSet}, owner) {

        const {color, hue} = _colorSet;

        const li = document.createElement('li');
        li.className = 'collection-item avatar z-depth-1';
        li.setAttribute('data-to', _username);

        const avatar = document.createElement('i');
        avatar.className = `material-icons circle ${color} ${hue}`;
        avatar.innerText = 'person';
        li.appendChild(avatar);

        const title = document.createElement('span');
        title.className = 'title';
        title.innerText = _username;
        li.appendChild(title);

        const pRoom = document.createElement('p');
        pRoom.innerText = _room;
        li.appendChild(pRoom);

        if (owner) {

            const action = document.createElement('a');
            action.setAttribute('href', 'javascript:void(0);');
            action.style.cursor = 'default';
            action.className = 'secondary-content';
            li.appendChild(action);

            const actionIcon = document.createElement('i');
            actionIcon.className = 'material-icons grey-text';
            actionIcon.innerText = 'person_pin';
            action.appendChild(actionIcon);
        }

        return li;

    }

    static getRoomTemplate({_name, _ownerUsername, _numberOfUsers, _colorSet}, owner) {

        const {color, hue} = _colorSet;

        const li = document.createElement('li');
        li.className = 'collection-item avatar z-depth-1';
        li.setAttribute('data-roomName', _name);

        const avatar = document.createElement('i');
        avatar.className = `material-icons circle ${color} ${hue}`;
        avatar.innerText = 'folder_shared';
        li.appendChild(avatar);

        const title = document.createElement('span');
        title.className = 'title';
        title.innerText = _name;
        li.appendChild(title);

        const pRoom = document.createElement('p');
        pRoom.innerText = _ownerUsername;

        const brPRoom = document.createElement('br');
        pRoom.appendChild(brPRoom);

        pRoom.innerText += _numberOfUsers;
        li.appendChild(pRoom);

        const action = document.createElement('a');
        action.setAttribute('href', 'javascript:void(0);');
        action.style.cursor = 'default';
        action.className = 'secondary-content';


        if (owner) {

            const actionIconRoomOwner = document.createElement('i');
            actionIconRoomOwner.className = 'material-icons grey-text';
            actionIconRoomOwner.innerText = 'person_pin';
            action.appendChild(actionIconRoomOwner);

        }

        li.appendChild(action);

        return li;

    }
}