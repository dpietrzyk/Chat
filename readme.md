# Chat

### Start:
```
npm i
node main.js
```
When the server is ready, open [localhost:3000](http://localhost:3000)

### Tests   
To run a few very simple test:
```
npm install mocha -g
mocha tests  --recursive --watch
```

### Browsers:
Tested only on Chrome and Opera   
Please do not test the chat in one browser (for example open in chrome and opera).

### Available commands:
`/help` - show this message   
`/priv` - send private message to chosen user. If you want to use this please stick to this scheme:   
>/priv [username with space] [new line]   
>[message]

* new line: `Shift + Enter` or `Ctrl + Enter`,    
* send message: `Enter`

for example:   
>/priv chat user   
>Hello world!

This command sends message "Hello world!" to user with username "chat user".      

#### General:  
* In the right corner of top menu you can change your username and create new room.
* If you want to change your current room, just click on the name of the room you want to join. 
* If you want to send private message to other user, simply click on his name ;) 
* If you leave the room, and there will be no other users, this room will be removed immediately. 

