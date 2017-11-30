import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './ContactModal.css'

export default class ContactModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            firstName: {value: '', isValid: true},
            lastName: {value: '', isValid: true},
            phoneNumber: {value: '', isValid: true},
            email: {value: '', isValid: true},
            photo: {value: ''}
        };

        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedContact) {
            const {firstName = ''} = nextProps.selectedContact || {};
            const {lastName = ''} = nextProps.selectedContact || {};
            const {phoneNumber = ''} = nextProps.selectedContact || {};
            const {email = ''} = nextProps.selectedContact || {};
            const {photo = ''} = nextProps.selectedContact || {};
            this.state = {
                id: nextProps.selectedContact.id,
                firstName: {value: firstName, isValid: this.validate('firstName', firstName )},
                lastName: {value: lastName, isValid: this.validate('lastName', lastName )},
                phoneNumber: {value: phoneNumber, isValid: this.validate('phoneNumber', phoneNumber )},
                email: {value: email, isValid: this.validate('email', email )},
                photo: {value: photo}
            };
            this.isDisabled()
        }

    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const selectedContact = this.props.selectedContact
        const isValid = this.validate(name, value);

        this.setState({
            [name]: {value, isValid}
        })
    }

    validate(name, value) {
        if(name === 'email'){
            const emailRegEx = /^[a-zA-z\d\.]+@+[a-zA-z\d\.]{2,6}[.][a-zA-z]{1,5}$/ ;
            return emailRegEx.test(value);
        }
        if(name === 'firstName'){
            const firstNameRegEx = /^[a-zA-Z]{1,10}$/;
            return firstNameRegEx.test(value);
        }
        if(name === 'lastName'){
            const lastNameRegEx = /^[a-zA-Z]{1,10}$/;
            return lastNameRegEx.test(value);
        }
        if(name === 'phoneNumber'){
            const phoneNumberRegEx = /^[+]\d{12}$/;
            return phoneNumberRegEx.test(value)
        }
    }

    isDisabled() {
        return this.state.firstName.isValid &&
            this.state.lastName.isValid &&
            this.state.phoneNumber.isValid &&
            this.state.email.isValid ? false : true
    }



    handleSubmit(event) {
        event.preventDefault();

        let contact = {
            id: this.state.id,
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            photo: this.state.photo.value,
            phoneNumber: this.state.phoneNumber.value,
        }
        this.props.onSubmitContact(contact);
        this.props.onExit();
    }

    onFileUpload() {
        let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
        fileUploadDom.click();
    }

    handleFileUpload(event) {
        let input = event.target;
        let self = this;
        let reader = new FileReader();
        reader.onload = function(){
            self.setState({ photo: {value: reader.result} })
        };
        reader.readAsDataURL(input.files[0]);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onExit}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.isDisabled()}
                onClick={this.handleSubmit}
            />,
        ];
        const isOpen = this.props.selectedContact? true : false;
        return (
            <Dialog
                title='Contact Card'
                actions={actions}
                modal={true}
                open={isOpen}
                bodyClassName="modal-body"
                contentStyle={{maxWidth: "400px", minWidth: "300px"}}
            >
                <TextField
                    floatingLabelText="First Name"
                    onChange={ this.handleChange }
                    name="firstName"
                    maxLength="16"
                    defaultValue={this.state.firstName.value}
                />
                <TextField
                    floatingLabelText="Last Name"
                    onChange={ this.handleChange }
                    name="lastName"
                    maxLength="16"
                    defaultValue={this.state.lastName.value}
                />
                <TextField
                    floatingLabelText="Phone Number"
                    onChange={ this.handleChange }
                    name="phoneNumber"
                    maxLength="13"
                    errorText={this.state.phoneNumber.isValid? '':'Required!'}
                    defaultValue={this.state.phoneNumber.value}
                />
                <TextField
                    floatingLabelText="E-mail"
                    onChange={ this.handleChange }
                    name="email"
                    errorText={this.state.email.isValid? '':'Required!'}
                    defaultValue={this.state.email.value}
                />

                <RaisedButton
                    label="Choose Photo"
                    className="upload-button"
                    style={{width: "30%", minWidth: "150px"}}
                    onClick={ this.onFileUpload }
                />
                <p>{ this.state.photo.value? 'Photo loaded':'No photo loaded' }</p>
                    <input
                    type="file"
                    style={{visibility: 'hidden'}}
                    name="photo"
                    ref="fileUpload"
                    onChange={ this.handleFileUpload }
                />
            </Dialog>
        )
    }

}
