import React from 'react';
import Auth from "./Auth"
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

class Callback extends React.Component {

    render() {
        handleAuthentication(this.props);
        return (
            <div >
                <a>Loading...</a>
            </div>
        );
    }
}


export default Callback;
