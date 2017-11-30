export const ADD_CONTACT = 'ADD_CONTACT';
export const SELECT_CONTACT = 'SELECT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SUBMIT_CONTACT = 'SUBMIT_CONTACT';
export const SEARCH_CONTACT = 'SEARCH_CONTACT';
export const EXIT_POPUP = 'EXIT_POPUP';

export const handleAddContact = () => ({
        type: ADD_CONTACT,
        payload: {}
})

export const handleSelectContact = contact => ({
    type: SELECT_CONTACT,
    payload: {
        contact
    }
})

export const handleDeleteContact = deleteContact => ({
    type: DELETE_CONTACT,
    payload: {
        deleteContact
    }
})

export const handleSubmitContact = contact => ({
    type: SUBMIT_CONTACT,
    payload: {
        contact
    }
})

export const handleExit = () => ({
    type: EXIT_POPUP,
    payload: {}
})

export const handleSearchContact = searchText => ({
    type: SEARCH_CONTACT,
    payload: {
        searchText
    }
})
