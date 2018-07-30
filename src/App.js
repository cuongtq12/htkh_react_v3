import React, {Component} from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserIcon from '@material-ui/icons/Group';
import { UserList } from './users';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import Login from './Login';
import {API_URL} from './utils/config';
import httpClient from './httpClient';
import MyLayout from './MyLayout';
const dataProvider = jsonServerProvider(API_URL, httpClient);

class App extends Component {
    render() {
        return (
            <Admin loginPage={Login} authProvider={authProvider} dashboard={Dashboard} dataProvider={dataProvider}>
                <Resource name="admin/users" list={UserList} icon={UserIcon} options={{label: "Danh sách người dùng"}}/>
            </Admin>
        )
    }
}

export default App;