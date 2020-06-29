import db from 'db'
import firebase from 'firebase/app'
import { createRef } from './index'

export const createOffer = offer => db.collection('offers').add(offer)

export const fetchSentOffers = userId => {
    const userRef = createRef('profiles', userId)
    return db
        .collection('offers')
        .where('fromUser', '==', userRef)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

export const fetchRecievedOffers = userId => {
    const userRef = createRef('profiles', userId)
    return db
        .collection('offers')
        .where('toUser', '==', userRef)
        .get()
        .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

export const clearEmployee = companyId => {
    db.collection("offers")
        .where("companyId", "==", companyId)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                db.collection("offers").doc(doc.id).update({ status: 'declined' })
            });
        })
}

export const changeOfferStatus = (offerId, status) =>
    db.collection('offers')
        .doc(offerId)
        .update({ status })


export const changeServiceQuantity = serviceId => {
    db.collection('services')
        .doc(serviceId)
        .update({ quantity: firebase.firestore.FieldValue.increment(-1) })
}
