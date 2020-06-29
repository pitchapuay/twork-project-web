import firebase from 'firebase/app'
import 'firebase/auth'
import db from 'db'

const createUserProfile = (userProfile) =>
    db.collection('profiles')
        .doc(userProfile.uid)
        .set(userProfile)

export const register = async userProfile => {
    try {
        createUserProfile(userProfile)
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const logout = () => firebase.auth().signOut()

export const onAuthStateChanged = onAuthCallback =>
    firebase.auth().onAuthStateChanged(onAuthCallback)

export const getUserProfile = uid =>
    db.collection('profiles')
        .doc(uid)
        .get()
        .then(snapshot => ({ uid, ...snapshot.data() }))

export const getUserId = uid =>
    getUserProfile(uid)
        .then(user => {
            if (user.signupAs === 'owner') {
                return uid
            } else if (user.signupAs === 'employee') {
                return uid
            }
        })

export const getProfileSnapshot = uid => {
    return db.collection('profile')
        .doc(uid)
        .get()
        .then(snapshot => {
            const profile = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return profile
        })
}