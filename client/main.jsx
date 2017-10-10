import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from '../imports/ui/App.jsx';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));
});