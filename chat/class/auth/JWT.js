const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(path.join(__dirname, './keys/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, './keys/public.key'), 'utf8');

class JWT {

    static create(userObj) {
        const payload = JWT._getPayload(userObj);
        const options = JWT._getOptions();

        return jwt.sign(payload, privateKey, options);
    }

    static verify(token) {
        try {
            return jwt.verify(token, publicKey);
        } catch (err) {
            throw new Error('Invalid token');
        }
    }

    static _getPayload(userObj) {
        const {name, displayedName} = userObj;

        return {name, displayedName};
    }

    static _getOptions() {
        return {
            expiresIn: '7d',
            algorithm: 'RS256',
        };
    }


}

module.exports = JWT;