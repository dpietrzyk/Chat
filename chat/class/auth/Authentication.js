const passHash = require('password-hash');
const JWT = require('./JWT');

class Authentication {

    static authenticate(userObj, pass) {
        if (passHash.verify(pass, userObj.pass))
            return JWT.create(userObj);

        throw new Error('Invalid credentials');
    }

}

module.exports = Authentication;
