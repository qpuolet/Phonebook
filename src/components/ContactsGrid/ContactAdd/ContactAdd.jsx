import React from 'react';

import './ContactAdd.css';

export default class ContactAdd extends React.Component {

    render() {
        return (
            <div className="add-contact" onClick={ this.props.onAdd }>
                <svg className="icon icon-user-plus">
                    <use href="#icon-user-plus"></use>
                </svg>
            </div>
        )
    }
}
