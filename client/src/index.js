import React from "react";
import ReactDOM, {render} from "react-dom";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import Auth from './views/Auth/Auth';
import Login from './views/Auth/Login';
import Logout from './views/Auth/Logout';

import history from './history';

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import Callback from "views/Auth/Callback"

import "assets/css/material-dashboard-react.css?v=1.6.0";

const auth0 = new Auth();

if (auth0.isAuthenticated()) {
    console.log('AUTH =>>> ',auth0.isAuthenticated());
    ReactDOM.render(
        <Router history={history}>
            <Switch>
                <Route path="/callback" component={Callback}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/rtl" component={RTL}/>
                <Redirect from="/" to="/admin/dashboard"/>
            </Switch>
        </Router>,
        document.getElementById("root")
    );

} else {
    ReactDOM.render(
        <Router history={history}>
            <Switch>
                <Route path="/callback" component={Callback}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Redirect to="/login"/>
            </Switch>
        </Router>,
        document.getElementById("root")
    );
}

