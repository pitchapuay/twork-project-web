import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const db = firebase
    .initializeApp(
        {
            apiKey: "AIzaSyCHqCNkNjnPcHeEiu4Ib1pqbo-3YBxnEUY",
            authDomain: "twork-8dd6d.firebaseapp.com",
            databaseURL: "https://twork-8dd6d.firebaseio.com",
            projectId: "twork-8dd6d",
            storageBucket: "twork-8dd6d.appspot.com",
            messagingSenderId: "275449722981",
            appId: "1:275449722981:web:44fd2c447589c353f62e8c",
            measurementId: "G-QP71HV94PF"
        }
    )
    .firestore()

export const provider_Facebook = new firebase.auth.FacebookAuthProvider();
export const provider_Google = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage()

export default db


const { Timestamp } = firebase.firestore
export { Timestamp }