import Cookies from 'universal-cookie';
import {fetchUtils} from 'react-admin';
import {JWT_HEADER, JWT_PREFIX, TOKEN} from "./utils/config";

export default (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers();
    }
    let cookies = new Cookies();
    var token = cookies.get(TOKEN);
    options.headers.set(JWT_HEADER, JWT_PREFIX + token);
    return fetchUtils.fetchJson(url, options);
};