import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ContactsApp from './components/ContactsApp.jsx';

ReactDOM.render(
    <MuiThemeProvider>
        <ContactsApp />
    </MuiThemeProvider>,
    document.getElementById('mount-point')
);
