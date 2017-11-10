import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ContactEditModal from './ContactEditModal/ContactEditModal.jsx';

import './ContactEdit.css'

export default class ContactEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
      this.setState({
          open: false
      });
    }

    render() {
        return (
            <div className="contact-edit">
                <svg
                    className="icon icon-pencil"
                    style={{visibility: this.props.visibility }}
                    onClick={ this.handleOpen }
                >
                    <use href="#icon-pencil"></use>
                </svg>
                <ContactEditModal
                    onEditContact={ (editedContact)=>this.setState({
                            open: false
                        },
                            ()=>this.props.onEditContact(editedContact)
                        )
                    }
                    onHandleClose={ this.handleClose }
                    isOpen={ this.state.open }
                    editContact={ this.props.editContact }
                />
            </div>
        )
    }

}
