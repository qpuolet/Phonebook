
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContactsApp from '../components/ContactsApp.jsx'
import * as Actions from './actions.js'

export class Container extends React.Component {
    render(){
        return (
            <ContactsApp actions={this.props.actions} state={this.props.state} />
        )
    }
}

const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
