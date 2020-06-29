import db from 'db'

import firebase from 'firebase/app'
import { createRef } from './index'

export const fetchServiceById = serviceId =>
    db.collection('services')
        .doc(serviceId)
        .get()
        .then(snapshot => ({ id: snapshot.id, ...snapshot.data() }))

// get worktime

export const fetchWorktime = serviceId =>
    db.collection('services')
        .doc(serviceId)
        .get()
        .then(snapshot => snapshot.data().worktime)

export const fetchServices = () =>
    db.collection('services')
        .orderBy('quantity', 'desc')
        .get()
        .then(snapshot => {
            const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return services
        })

export const fetchUserCompanies = userId => {
    const userRef = createRef('profiles', userId)
    return db
        .collection('services')
        .where("user", "==", userRef)
        .get()
        .then(snapshot => {
            const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            return services
        })
}

export const addServicesToProfiles = newService => {
    return db
        .collection('profiles')
        .add(newService)
        .then(docRef => docRef.id)
}

export const createCompany = newCompany => {
    return db
        .collection('services')
        .add(newCompany)
        .then(docRef => docRef.id)
}

export const addMyJob = (uid, companyId) => {
    return db
        .collection('profiles')
        .doc(uid)
        .update({ myOffers: firebase.firestore.FieldValue.arrayUnion(companyId) })
}

export const addMyCompany = (uid, companyRef) => {
    return db
        .collection('profiles')
        .doc(uid)
        .update({ myCompany: firebase.firestore.FieldValue.arrayUnion(companyRef) })
}

export const clearServiceQuantity = serviceId => {
    return db.collection('services')
        .doc(serviceId)
        .update({ quantity: 0 })
}
