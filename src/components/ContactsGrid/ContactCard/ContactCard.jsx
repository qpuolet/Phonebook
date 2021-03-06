import React from 'react';
import ReactDOM from 'react-dom';

import './ContactCard.css';

export default class ContactCard extends React.Component {

    render() {
        const {contact} = this.props;
        return (
            <div className="contact">
                <img className="avatar" src={contact.photo} />
                <address className="contact-info">
                    <h3 className="name">{ contact.firstName }</h3>
                    <h3 className="name">{ contact.lastName }</h3>
                    <span>{ contact.phoneNumber }</span>
                    <div>
                        <a className="email-link" href={ contact.email }>
                            { contact.email.length > 20?
                                `${contact.email.slice(0,19)}...`:
                                contact.email
                            }
                        </a>
                    </div>
                </address>
                <div className="card-manipulators">
                    <svg className="icon icon-cross" onClick={ this.props.onDelete }>
                        <use href="#icon-cross"></use>
                    </svg>
                    <svg className="icon icon-pencil" onClick={ this.props.onSelect }>
                        <use href="#icon-pencil"></use>
                    </svg>
                </div>
            </div>
        );
    }
}
