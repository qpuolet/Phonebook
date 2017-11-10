import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// import './ContactEditModal.css'

export default class ContactEditModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            success: false,
            emailIsValid: true,
            phoneNumberIsValid: true,
            submitDisable: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    onFileUpload() {
        let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
        fileUploadDom.click();
    }

    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        //Validation
        if(name === 'email'){
            let emailRegEx = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+(\-)?[a-zA-Z0-9]+(\.)?[a-zA-Z0-9]{2,6}?\.[a-zA-Z]{2,6}$/ ;
            let testEmail = emailRegEx.test(value);
            this.setState({ emailIsValid: testEmail })
        }
        if(name === 'phoneNumber'){
            let phoneNumberRegEx = /^[+]\d{12}$/;
            let testPhoneNumber = phoneNumberRegEx.test(value);
            this.setState({ phoneNumberIsValid: testPhoneNumber });
        }

        this.setState({
            [name]: value,
            submitDisable:
                this.state.emailIsValid && this.state.phoneNumberIsValid? false: true
        })
    }
    handleFileUpload(event) {
        let input = event.target;
        let self = this;
        let reader = new FileReader();
        reader.onload = function(){
            self.setState({
                img: reader.result,
                success: true
            })
        };
        reader.readAsDataURL(input.files[0]);
    }

    handleSubmit(event) {
        event.preventDefault();
        let editedContact = {
            id: this.props.editContact.id,
            firstName: this.state.firstName || this.props.editContact.firstName,
            lastName: this.state.lastName || this.props.editContact.lastName,
            email: this.state.email || this.props.editContact.email,
            image: this.state.img || this.props.editContact.image,
            phoneNumber: this.state.phoneNumber || this.props.editContact.phoneNumber,
        }
        this.props.onEditContact(editedContact);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onHandleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.submitDisable}
                onClick={this.handleSubmit}
            />
        ];
        return (
            <Dialog
                title="Edit Contact"
                actions={actions}
                modal={true}
                open={this.props.isOpen}
                bodyClassName="modal-body"
                contentStyle={{maxWidth: "400px", minWidth: "300px"}}
            >
                <TextField
                    floatingLabelText="First Name"
                    onChange={ this.handleChange }
                    name="firstName"
                    maxLength="16"
                    defaultValue={this.props.editContact.firstName}
                />
                <TextField
                    floatingLabelText="Last Name"
                    onChange={ this.handleChange }
                    name="lastName"
                    maxLength="16"
                    defaultValue={this.props.editContact.lastName}
                />
                <TextField
                    floatingLabelText="Phone Number"
                    onChange={ this.handleChange }
                    name="phoneNumber"
                    defaultValue={this.props.editContact.phoneNumber}
                    errorText={this.state.phoneNumberIsValid? '':'Required!'}
                />
                <TextField
                    floatingLabelText="E-mail"
                    onChange={ this.handleChange }
                    name="email"
                    defaultValue={this.props.editContact.email}
                    errorText={this.state.emailIsValid? '':'Required!'}
                />

                <RaisedButton
                    label="Choose Photo"
                    style={{width: "30%", minWidth: "150px"}}                    
                    className="upload-button"
                    onClick={ this.onFileUpload }
                />
                <p>{ this.state.success? 'New photo loaded':'' }</p>
                <input
                    type="file"
                    style={{visibility: 'hidden'}}
                    name="img"
                    ref="fileUpload"
                    onChange={ this.handleFileUpload }
                />
            </Dialog>
        )
    }

}
