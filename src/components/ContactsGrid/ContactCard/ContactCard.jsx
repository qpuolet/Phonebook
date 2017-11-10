import React from 'react';
import ReactDOM from 'react-dom';

import ContactEdit from './ContactEdit/ContactEdit.jsx'

import './ContactCard.css';

export default class ContactCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visibility: 'hidden',
        }
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOut = this.handleHoverOut.bind(this);
    }

    handleHoverOn() {
        this.setState({ visibility: 'visible' })
    }

    handleHoverOut() {
        this.setState({ visibility: 'hidden' })
    }

    render() {
        return (
            <div className="contact" onMouseOver={this.handleHoverOn}  onMouseOut={this.handleHoverOut}>
                <img className="avatar" src={this.props.avatar} />

                <address className="contact-info">
                    <h3 className="name">{ this.props.firstName }</h3>
                    <h3 className="name">{ this.props.lastName }</h3>
                    <span>{ this.props.phoneNumber }</span>
                    <div>
                        <a className="email-link" href={ this.props.email }>
                            { this.props.email.length > 20?
                                `${this.props.email.slice(0,19)}...`:
                                this.props.email
                            }
                        </a>
                    </div>
                </address>
                <div className="card-manipulators">
                    <svg
                        className="icon icon-cross"
                        style={{visibility: this.state.visibility }}
                        onClick={ this.props.onDeleteContact }
                    >
                        <use href="#icon-cross"></use>
                    </svg>
                    <ContactEdit
                        visibility={ this.state.visibility }
                        onEditContact={ this.props.onEditContact }
                        editContact={ this.props.editContact }
                    />
                </div>
            </div>
        );
    }
}
