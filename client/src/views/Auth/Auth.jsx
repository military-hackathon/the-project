import auth0 from 'auth0-js';
import history from '../../history';
export default class Auth {

    // Please use your own credentials here
    auth0 = new auth0.WebAuth({
        domain: 'delta1-demo.eu.auth0.com',
        clientID: '0qKaJawnakClnsDHXOFgc6hJG8KIHa64',
        redirectUri: 'http://localhost:4200/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    login = () => {
        this.auth0.authorize();
    };

    // parses the result after authentication from URL hash
    handleAuthentication = () => {

        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else {
                console.log('err', err);
                history.replace('/');
            }
        });
    };

    // Sets user details in localStorage
    setSession = (authResult) => {
// Set isLoggedIn flag in localStorage
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        history.replace('/admin/dashboard');
    };

    // removes user details from localStorage
    logout = () => {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        this.auth0.logout({
            return_to: window.location.origin
        });
        // navigate to the home route
        history.replace('/admin/dashboard');
    };

    // checks if the user is authenticated
    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
