import React from 'react';
import PropTypes from 'prop-types';

const MyUrlField = ({ record = {}, source }) =>
    <a href={record[source]}>
        {record[source]}
    </a>;

MyUrlField.propTypes = {
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default MyUrlField;