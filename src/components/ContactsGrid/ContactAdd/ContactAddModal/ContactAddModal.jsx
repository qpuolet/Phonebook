import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './ContactAddModal.css'

export default class ContactAddModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            success: false,
            emailIsValid: false,
            firstNameIsValid: false,
            lastNameIsValid: false,
            phoneNumberIsValid: false,
            submitDisable: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        //Validation
        if(name === 'email'){
            let emailRegEx = /^[a-zA-z\d\.]+@+[a-zA-z\d\.]{2,6}[.][a-zA-z]{1,5}$/ ;
            let testEmail = emailRegEx.test(value);
            this.setState({ emailIsValid: testEmail })
        }
        if(name === 'firstName'){
            let firstNameRegEx = /^[a-zA-Z]{1,10}$/;
            let testFirstName = firstNameRegEx.test(value);
            this.setState({ firstNameIsValid: testFirstName })
        }
        if(name === 'lastName'){
            let lastNameRegEx = /^[a-zA-Z]{1,10}$/;
            let testFirstName = lastNameRegEx.test(value);
            console.log(testFirstName);
            this.setState({ lastNameIsValid: testFirstName })
        }
        if(name === 'phoneNumber'){
            let phoneNumberRegEx = /^[+]\d{12}$/;
            let testPhoneNumber = phoneNumberRegEx.test(value);
            this.setState({ phoneNumberIsValid: testPhoneNumber });
        }

        this.setState({
            [name]: value,
            submitDisable:
                this.state.emailIsValid &&
                this.state.firstNameIsValid &&
                this.state.phoneNumberIsValid &&
                this.state.lastNameIsValid? false: true
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        let newContact = {
            id: Date.now(),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            image: this.state.img,
            phoneNumber: this.state.phoneNumber,
        }
        this.setState({
            success: false,
            emailIsValid: false,
            firstNameIsValid: false,
            lastNameIsValid: false,
            phoneNumberIsValid: false,
            submitDisable: true
        });

        this.props.onAddContact(newContact);
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
            self.setState({ img: reader.result, success: true })
        };
        reader.readAsDataURL(input.files[0]);
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
            />,
        ];
        return (
            <Dialog
                title="New Contact"
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
                />
                <TextField
                    floatingLabelText="Last Name"
                    onChange={ this.handleChange }
                    name="lastName"
                    maxLength="16"
                />
                <TextField
                    floatingLabelText="Phone Number"
                    onChange={ this.handleChange }
                    name="phoneNumber"
                    errorText={this.state.phoneNumberIsValid? '':'Required!'}
                />
                <TextField
                    floatingLabelText="E-mail"
                    onChange={ this.handleChange }
                    name="email"
                    errorText={this.state.emailIsValid? '':'Required!'}
                />

                <RaisedButton
                    label="Choose Photo"
                    className="upload-button"
                    style={{width: "30%", minWidth: "150px"}}
                    onClick={ this.onFileUpload }
                />
                <p>{ this.state.success? 'Photo loaded':'No photo loaded' }</p>
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
