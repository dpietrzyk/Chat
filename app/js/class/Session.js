import {Swal} from './Swal.js';

let _savedToken;
export class Session {

  static async authenticate(credentials) {
    try {
      const response = await axios.post('authenticate', {...credentials});
      Cookies.set('jwt', response.data, {expires: 10});
      Swal.showAuthSuccessModal(this.decodeToken(response.data).name);

      return response.data;

    } catch (e) {
      await Swal.showAuthFailedModal();
      return await this.getOrCreateToken();
    }
  };


  static async getOrCreateToken(socket) {
    if (!this.token) {
      const credentials = await Swal.showUserNameModal(socket);
      _savedToken = await this.authenticate(credentials);
    }

    return this.token;
  };

  static decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

  static get token() {
    return _savedToken || Cookies.get('jwt');
  }

  static get name() {
    if (!this.token)
      throw new Error('No saved token!');

    return this.decodeToken(this.token).name;
  }


}




