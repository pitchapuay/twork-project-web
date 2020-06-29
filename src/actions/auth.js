import {
    SET_AUTH_USER,
    RESET_AUTH_STATE
} from '../types'

import * as api from 'api'

export const register = (registerFormData, signupAs) => {
    if (signupAs === 'employee') {
        const myOffers = []
        registerFormData = registerFormData.splice(registerFormData.length, 0, myOffers)
    } else if (signupAs === 'owner') {
        const myCompany = []
        registerFormData = registerFormData.splice(registerFormData.length, 0, myCompany)
    }
    return api.register({ ...registerFormData })
}

export const onAuthStateChanged = onAuthCallback => api.onAuthStateChanged(onAuthCallback)

export const logout = uid => dispatch =>
    api
        .logout()
        .then(_ => dispatch({ user: null, type: SET_AUTH_USER }))

export const storeAuthUser = authUser => dispatch => {
    dispatch({ type: RESET_AUTH_STATE })
    if (authUser) {
        return api
            .getUserProfile(authUser.uid)
            .then(userWithProfile => dispatch({ user: userWithProfile, type: SET_AUTH_USER }))
    } else {
        return dispatch({ user: null, type: SET_AUTH_USER })
    }
}
