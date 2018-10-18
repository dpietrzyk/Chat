const passHash = require('password-hash');

class Autentication {

  static autenticate(userObj, pass) {
    return passHash.verify(pass,  userObj.pass) ?
        'yep' : 'nope';
  }

}

module.exports = Autentication;
