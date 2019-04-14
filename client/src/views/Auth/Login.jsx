import React from "react";
import Auth from "./Auth"
const auth = new Auth();

class Login extends React.Component {

    render() {
        auth.login();
        return (
            <div >
                <a>Please log in first...</a>
            </div>
        );
    }
}


export default Login;
