import React from 'react';

import './ContactAdd.css';

export default class ContactAdd extends React.Component {

    render() {
        return (
            <div className="add-contact" onClick={ this.props.onAdd }>
                <img className="add-contact-card" src="./img/add.png" />
            </div>
        )
    }
}
