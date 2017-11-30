import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SELECT_CONTACT,
    SUBMIT_CONTACT,
    EXIT_POPUP,
    SEARCH_CONTACT
} from './actions.js'

import data from '../contacts.js';

const initialState = {
    contacts: data,
    selectedContact: null,
    searchQuery: ''
}

export default function contacts(state = initialState, action){
    switch (action.type) {

        // adding new contact info (if pluss button was clicked)
        case ADD_CONTACT: {
            let selectedContact = {
                id: Date.now(),
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                photo: null
            }
            return Object.assign({}, state, { selectedContact })
        }

        // adding selectedContact info  to state (if pencil icon was clicked)
        case SELECT_CONTACT: {
            return Object.assign({}, state, { selectedContact: Object.assign({}, action.payload.contact) })
        }

        // deleting contact (if cross icon was clicked)
        case DELETE_CONTACT: {
            let contactId = action.payload.deleteContact.id;
            return Object.assign({}, state, {
                contacts: state.contacts.filter(contact => {
                    return contact.id !== contactId;
                    })
                }
            )
        }

        // Adding Edited Contact to list of contacts (if submit button was clicked in form)
        case SUBMIT_CONTACT: {
            let edited = action.payload.contact;
            let isFind = false;
            const newList = state.contacts.map(contact => {
                if (contact.id === edited.id) {
                    isFind = true;
                    return edited;
                }
                return contact;
            });
            if (!isFind) {
                newList.push(edited);
            }

            return Object.assign({}, state, {
                contacts: newList,
                selectedContact: null,
            });
        }

        // cleaning down selectedContact state (if cancel button was clicked)
        case EXIT_POPUP: {
            return Object.assign({}, state, { selectedContact: null});
        }

        // searching contacts
        case SEARCH_CONTACT: {
            let searchQuery = action.payload.searchText;
            searchQuery = searchQuery.length > 2? searchQuery.toLowerCase() : '';
            return Object.assign({}, state, {
                searchQuery: searchQuery
                }
            );
        }

        // default or unknown action
        default:
            return state;

    }
}
