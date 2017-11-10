import React from 'react';

import ContactCard from './ContactCard/ContactCard.jsx';
import ContactAdd from './ContactAdd/ContactAdd.jsx';

import './ContactsGrid.css';

export default class ContactsGrid extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="Contacts">
                <ContactAdd onAddContact={ this.props.handleContactAdd }/>

                { this.props.contacts.map(contact => (
                            <ContactCard
                                key={ contact.id }
                                firstName={ contact.firstName }
                                lastName={ contact.lastName }
                                phoneNumber={ contact.phoneNumber }
                                email={ contact.email }
                                avatar={ contact.image }
                                onDeleteContact={ this.props.handleContactDelete.bind(null, contact) }
                                onEditContact={ this.props.handleContactEdit }
                                editContact={ contact }
                            />
                        )
                    )
                }
            </div>
        );
    }
}
