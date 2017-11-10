import React from 'react';

import SearchArea from './SearchArea/SearchArea.jsx';
import ContactsGrid from './ContactsGrid/ContactsGrid.jsx';

import data from '../contacts.js'

const allData = data.slice();

export default class ContactsApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allData: allData,
            contacts: data
        };

        this.handleContactAdd = this.handleContactAdd.bind(this);
        this.handleContactDelete = this.handleContactDelete.bind(this);
        this.handleContactEdit = this.handleContactEdit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleContactAdd(newContact) {
        let freshContacts = this.state.contacts;
        let freshData = this.state.allData;
        freshContacts.push(newContact);
        freshData.push(newContact);
        this.setState({
            contacts: freshContacts,
            allData: freshData
        });
    }

    handleContactDelete(contact) {
        let contactId = contact.id;
        let newContacts = this.state.contacts.filter(contact => {
            return contact.id !== contactId;
        });
        let newAllData = this.state.allData.filter(contact => {
            return contact.id !== contactId;
        });
        this.setState({
            contacts: newContacts,
            allData: newAllData
        });
    }

    handleContactEdit(editedContact) {
        let editContactId = editedContact.id;
        let contacts = this.state.contacts;
        let allData = this.state.allData;

        let contactsIndex = contacts.findIndex(contact => {
            return contact.id === editContactId
        });
        let allDataIndex = this.state.allData.findIndex(contact => {
            return contact.id === editContactId
        });

        contacts[contactsIndex] = editedContact;
        allData[allDataIndex] = editedContact;

        this.setState({
            contacts: contacts,
            allData: allData
        });
    }

    handleSearch(event) {
        let searchContacts = this.state.allData;
        let search = event.target.value;
        if( search.length > 2){
            let searchQuery = search.toLowerCase();
            searchContacts = searchContacts.filter(contact => {
                let firstName = contact.firstName.toLowerCase();
                let lastName = contact.lastName.toLowerCase();
                return firstName.indexOf(searchQuery) !== -1 || lastName.indexOf(searchQuery) !== -1;
            });
        }
        this.setState({
            contacts: searchContacts
        });
    }

    render() {
        return (
            <div>
                <SearchArea
                    handleSearch={ this.handleSearch }
                />
                <ContactsGrid
                    handleContactAdd={ this.handleContactAdd }
                    handleContactDelete={ this.handleContactDelete }
                    handleContactEdit={ this.handleContactEdit }
                    contacts={ this.state.contacts }
                />
            </div>
        );
    }
}
