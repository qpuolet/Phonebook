import React from 'react';

import ContactCard from './ContactCard/ContactCard.jsx';
import ContactAdd from './ContactAdd/ContactAdd.jsx';

import './ContactsGrid.css';

export default class ContactsGrid extends React.Component {

    render() {
        return (
            <div className="contacts-grid">
                <ContactAdd onAdd={this.props.onAdd} />
                { this.props.contacts.map(contact => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onSelect={() => this.props.onSelect(contact)}
                                onDelete={() => this.props.onDelete(contact)}
                            />
                        )
                    )
                }
            </div>
        );
    }
}
