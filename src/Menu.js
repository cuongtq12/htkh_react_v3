import React from 'react';
import {connect} from 'react-redux';
import {getResources, MenuItem, MenuItemLink} from 'react-admin';
import {withRouter} from 'react-router-dom';
import Example from './Example';

const MyMenu = ({resources, onMenuClick}) => (
    <div>
        {
            resources.map(resource => (
                <MenuItemLink to={`/${resource.name}`} primaryText={resource.options.label} onClick={onMenuClick}/>
            ))
        }
        <MenuItemLink to="/admin/users" primaryText="Custom User" onClick={onMenuClick}/>
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(MyMenu));