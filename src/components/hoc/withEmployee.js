import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const withEmployee = Component => {

    class WithEmployee extends React.Component {

        render() {
            const { auth } = this.props

            if (auth.isAuth) {
                return auth.user.signupAs === 'employee' ? <Component {...this.props} /> : <Redirect to="/" />
            } else {
                return <Redirect to="/" />
            }

        }
    }

    return connect(({ auth }) => ({ auth }))(WithEmployee)
}

export default withEmployee