import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import './SearchArea.css';

export default class SearchArea extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="search-area">
                <div className="search-field">
                    <input type="text" placeholder="SearchArea" onChange={ this.props.handleSearch }/>
                </div>
            </div>
        );
    }
}
