import React, { Fragment } from 'react';
import spinner from '../../resources/img/spinner.gif';

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{
                width: '200px',
                height: '200px',
                margin: 'auto',
                display: 'block',
            }}
            alt="Loading..."
        />
    </Fragment>
);
