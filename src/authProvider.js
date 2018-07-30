import {AUTH_CHECK, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';
import Cookies from 'universal-cookie';
import request from './utils/request';
import {API_URL, TOKEN} from './utils/config';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const {username, password} = params;

        return request({
            method: 'POST',
            url: API_URL + '/api/auth/login',
            headers: {},
            data: {
                username: username,
                password: password,
            }
        }).then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }

            let cookies = new Cookies();
            cookies.set(TOKEN, response.accessToken, {
                path: '/'
            });
        });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const {status} = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        let cookies = new Cookies();
        var token = cookies.get(TOKEN) != null ? cookies.get(TOKEN) : sessionStorage.getItem(TOKEN);

        return token
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};