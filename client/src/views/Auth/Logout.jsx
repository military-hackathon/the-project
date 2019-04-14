import React from "react";
import Auth from "./Auth"

const auth = new Auth();

class LogOut extends React.Component {

    componentDidMount() {
        auth.logout()
    }

    render() {
        return (
            <div>
                <a>Logged out...</a>
            </div>
        );
    }
}

export default LogOut;
