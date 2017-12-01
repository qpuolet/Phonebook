import React from 'react'
import SearchArea from './SearchArea/SearchArea.jsx';
import ContactsGrid from './ContactsGrid/ContactsGrid.jsx';
import ContactModal from './ContactModal/ContactModal.jsx';

export default class ContactsApp extends React.Component {

    filterContacts() {
        const searchQuery = this.props.state.searchQuery;
        if(searchQuery) {
            return this.props.state.contacts.filter( ({firstName, lastName}) => {
                    return (
                        firstName.toLowerCase().indexOf(searchQuery) !== -1 ||
                        lastName.toLowerCase().indexOf(searchQuery) !== -1
                    )
                }
            )
        } else {
            return this.props.state.contacts
        }
    }

    render(){
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
