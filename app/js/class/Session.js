import {Swal} from './Swal.js';

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
        let token = Cookies.get('jwt');

        if (!token) {
            const credentials = await Swal.showUserNameModal(socket);
            token = await this.authenticate(credentials);
        }

        return token;
    };

    static decodeToken(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }

}




