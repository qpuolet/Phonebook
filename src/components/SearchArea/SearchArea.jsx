import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import './SearchArea.css';

export default class SearchArea extends React.Component {
    render() {
        return (
                <div className="search-area">
                    <input
                        type="text"
                        placeholder="SearchArea"
                        onChange={(e) => this.props.searchAction(e.target.value) }
                    />
                </div>
        );
    }
}
