import React from 'react';

import SearchArea from './SearchArea/SearchArea.jsx';
import ContactsGrid from './ContactsGrid/ContactsGrid.jsx';

import data from '../contacts.js'

export default class ContactsApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contacts: data,
            searchQuery: ''
        };

        this.handleContactAdd = this.handleContactAdd.bind(this);
        this.handleContactDelete = this.handleContactDelete.bind(this);
        this.handleContactEdit = this.handleContactEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleContactAdd(newContact) {
        let freshContacts = this.state.contacts;

        freshContacts.push(newContact);

        this.setState({
            contacts: freshContacts
        });
    }

    handleContactDelete(contact) {
        let contactId = contact.id;

        let newContacts = this.state.contacts.filter(contact => {
            return contact.id !== contactId;
        });

        this.setState({
            contacts: newContacts
        });
    }

    handleContactEdit(editedContact) {
        let editContactId = editedContact.id;
        let contacts = this.state.contacts;

        let contactsIndex = contacts.findIndex(contact => {
            return contact.id === editContactId
        });

        contacts[contactsIndex] = editedContact;

        this.setState({
            contacts: contacts
        });
    }

    handleSearch(event) {
        let searchQuery = event.target.value;
        searchQuery = searchQuery.length > 2? searchQuery.toLowerCase() : '';
        this.setState({
            searchQuery: searchQuery
        });
    }

    render() {
        const searchQuery = this.state.searchQuery;
        const contacts = this.state.contacts;

        return (
            <div>
                <SearchArea
                    handleSearch={ this.handleSearch }
                />
                <ContactsGrid
                    handleContactAdd={ this.handleContactAdd }
                    handleContactDelete={ this.handleContactDelete }
                    handleContactEdit={ this.handleContactEdit }
                    contacts={ searchQuery === ''?
                        contacts :
                        contacts.filter(
                            ({firstName, lastName}) => {
                                let firstNameLow = firstName.toLowerCase();
                                let lastNameLow = lastName.toLowerCase();
                                return (
                                    firstNameLow.indexOf(searchQuery) !== -1 || lastNameLow.indexOf(searchQuery) !== -1
                                )
                            }
                        )
                    }
                />
            </div>
        );
    }
}
