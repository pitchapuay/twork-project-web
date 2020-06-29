import db from 'db'
import firebase from 'firebase/app'
import { createRef } from './index'

export const createCollaboration = collab =>
    db.collection('collaborations')
        .add(collab)
        .then(docRef => docRef.id)

export const sendMessage = message =>
    db.collection('alert')
        .add(message)
        .then(docRef => docRef.id)

export const subscribeToMessages = (userId, callback) =>
    db.collection('alert')
        .where('toUser', '==', userId)
        .onSnapshot(snapshot => {
            const alert = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            callback(alert)
        })

export const alertOwner = userId => {
    return db.collection('alert')
        .where('signupAs', '==', 'owner')
        .where('toUser', '==', userId)
        .get()
        .then(snapshot => {
            const alert = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return alert
        })
}

export const alertEmployee = userId => {
    return db.collection('alert')
        .where('signupAs', '==', 'employee')
        .where('fromUserUid', '==', userId)
        .get()
        .then(snapshot => {
            const alert = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return alert
        })
}

// export const markMessageAsRead = message =>
//     db.collection('profiles')
//         .doc(message.toUser)
//         .collection('messages')
//         .doc(message.id)
//         .update({ isRead: true })

export const fetchCollaborations = userId =>
    db.collection('collaborations')
        .where('allowedPeople', 'array-contains', userId)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

export const fetchCollaborationById = collabId =>
    db.collection('collaborations')
        .doc(collabId)
        .get()
        .then(snapshot => {
            const collab = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return collab
        })

export const subToCollaboration = (collabId, done) =>
    db.collection('collaborations')
        .doc(collabId)
        .onSnapshot(snapshot => {
            const collab = { id: snapshot.id, ...snapshot.data() }
            done(collab)
        })

export const joinCollaboration = (collabId, uid) => {
    const userRef = createRef('profiles', uid)

    return db
        .collection('collaborations')
        .doc(collabId)
        .update({ joinedPeople: firebase.firestore.FieldValue.arrayUnion(userRef) })
}

export const leaveCollaboration = (collabId, uid) => {
    const userRef = createRef('profiles', uid)

    return db
        .collection('collaborations')
        .doc(collabId)
        .update({ joinedPeople: firebase.firestore.FieldValue.arrayRemove(userRef) })
}

export const subToProfile = (uid, done) =>
    db.collection('profiles')
        .doc(uid)
        .onSnapshot(snapshot => {
            const user = { id: snapshot.id, ...snapshot.data() }
            done(user)
        })

export const sendChatMessage = ({ message, collabId, timestamp }) =>
    db.collection('collaborations')
        .doc(collabId)
        .collection('messages')
        .doc(timestamp)
        .set(message)

export const subToMessages = (collabId, done) =>
    db.collection('collaborations')
        .doc(collabId)
        .collection('messages')
        .onSnapshot(snapshot => done(snapshot.docChanges()))

export const startCollaboration = (collabId) =>
    db.collection('collaborations')
        .doc(collabId)