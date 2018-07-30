import React from 'react';
import { List, Datagrid, EmailField, TextField, DateField, BooleanField, EditButton } from 'react-admin';

export const UserList = (props) => (
    <List title="All users" {...props}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <TextField source="username" label="Tên đăng nhập"/>
            <EmailField source="email"/>
            <TextField source="fullname" label="Tên đầy đủ"/>
            <TextField source="address" label="Địa chỉ"/>
            <TextField source="phone" label="SĐT"/>
            <BooleanField source="islock" label="Khóa"/>
            <DateField source="datecreate" label="Ngày Tạo"/>
            <EditButton/>
        </Datagrid>
    </List>
);