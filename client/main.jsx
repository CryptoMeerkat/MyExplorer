import React from 'react';
import {Meteor} from 'meteor/meteor';
import * as ReactDOM from 'react-dom';
import Layout from '../imports/ui/Layout.jsx';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

Meteor.startup(() => {
    ReactDOM.render(<Layout/>, document.getElementById('render-target'));
});