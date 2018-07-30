import axios from 'axios';
import {TOKEN, JWT_HEADER, JWT_PREFIX} from "./config";
import Cookies from 'universal-cookie';

const fetch = (options) => {
    return axios(options);
};

const request = options => {
    if (options.headers === undefined) {
        let cookies = new Cookies();
        var token = cookies.get(TOKEN);
        if (token != null) {
            options.headers = {
                [JWT_HEADER]: JWT_PREFIX + token
            }
        }
    }
    return fetch(options).then(response => {
        const {statusText, status} = response;
        let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data;
        if (data instanceof Array) {
            data = {
                list: data,
            }
        }
        return Promise.resolve({
            success: true,
            message: statusText,
            statusCode: status,
            ...data,
        })
    }).catch(error => {
        const {response} = error;
        let msg;
        let statusCode;
        if (response && response instanceof Object) {
            const {data, statusText} = response;
            statusCode = response.status;
            msg = data.message || statusText
        } else {
            statusCode = 600;
            msg = 'Không thể kết nối tới máy chủ.';
        }

        /* eslint-disable */
        return Promise.reject({success: false, statusCode, message: msg})
    });
};

export default request;