import React from 'react';

import ContactAddModal from './ContactAddModal/ContactAddModal.jsx';

import './ContactAdd.css';

export default class ContactAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({
            open: true
        });
    };

    handleClose() {
      this.setState({
          open: false
      });
    };

    render() {
        return (
            <div className="add-contact" onClick={ this.handleOpen }>
                <img className="add-contact-card" src="./img/add.png" />
                <ContactAddModal
                    onAddContact={ (newContact)=>this.setState({
                            open: false
                        },
                            ()=>this.props.onAddContact(newContact)
                        )
                    }
                    onHandleClose={ this.handleClose }
                    isOpen={ this.state.open }
                />
            </div>
        )
    }
}
