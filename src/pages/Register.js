/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import onlyGuest from 'components/hoc/onlyGuest'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app'

const Register = () => {
    
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/registerinfo',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
          ],
    }

    return (
        <div className="auth-page">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title has-text-grey">สมัครสมาชิก</h3>
                    <p className="subtitle has-text-grey">กรุณาสมัครสมาชิกก่อนเข้าสู่เว็บไซต์</p>

                    {/* OAuth login */}

                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

                </div>
            </div>
        </div>
    )
}

export default onlyGuest(Register)