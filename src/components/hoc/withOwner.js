import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const withOwner = Component => {

    class WithOwner extends React.Component {

        render() {
            const { auth } = this.props

            if (auth.isAuth) {
                return auth.user.signupAs === 'owner' ? <Component {...this.props} /> : <Redirect to="/" />
            } else {
                return <Redirect to="/" />
            }
        }
    }

    return connect(({ auth }) => ({ auth }))(WithOwner)
}

export default withOwner