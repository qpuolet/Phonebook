import React from 'react'
import SearchArea from './SearchArea/SearchArea.jsx';
import ContactsGrid from './ContactsGrid/ContactsGrid.jsx';
import ContactModal from './ContactModal/ContactModal.jsx';

export default class ContactsApp extends React.Component {
    
    filterContacts() {
        const searchQuery = this.props.state.searchQuery;
        if(searchQuery) {
            return this.props.state.contacts.filter(({firstName, lastName}) => {
                    let firstNameLow = firstName.toLowerCase();
                    let lastNameLow = lastName.toLowerCase();
                    return (
                        firstNameLow.indexOf(searchQuery) !== -1 ||
                        lastNameLow.indexOf(searchQuery) !== -1
                    )
                }
            )
        } else {
            return this.props.state.contacts
        }
    }

    render(){
        const searchQuery = this.props.state.searchQuery;
        return (
            <div>
                <ContactModal
                    selectedContact={this.props.state.selectedContact}
                    onSubmitContact={this.props.actions.handleSubmitContact}
                    onExit={this.props.actions.handleExit}
                />
                <SearchArea searchAction={this.props.actions.handleSearchContact}/>
                <ContactsGrid
                    onAdd={this.props.actions.handleAddContact}
                    onSelect={this.props.actions.handleSelectContact}
                    onDelete={this.props.actions.handleDeleteContact}
                    contacts={this.filterContacts()}
                />
            </div>
        )
    }
}
