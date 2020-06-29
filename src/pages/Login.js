/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import onlyGuest from 'components/hoc/onlyGuest'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app'
import {auth} from 'db'

class Login extends React.Component {

    state = {
        isSignedIn: false
    }

    uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
          ],
    }

    componentDidMount() {
        this.unregisterAuthObserver = auth.onAuthStateChanged(
            user => this.setState({ isSignedIn: !!user }))
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {

        return (
            <div className="auth-page">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title has-text-grey">เข้าสู่ระบบ</h3>
                        <p className="subtitle has-text-grey">กรุณาเข้าสู่ระบบก่อนเข้าสู่เว็บไซต์</p>

                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />

                    </div>
                </div>
            </div>
        )
    }

}

export default onlyGuest(Login)