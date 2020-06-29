import {
    FETCH_OFFERS_SUCCESS,
    CHANGE_OFFER_STATUS,
    FETCH_RESOURCE_SUCCESS,
    REQUEST_RESOURCE
} from 'types'

import * as api from 'api'

export const createOffer = offer => api.createOffer(offer)

const extractDataFromOffer = async (offer, userType1, userType2) => {
    const company = await offer.company.get()
    const user1 = await offer[userType1].get()
    const user2 = await offer[userType2].get()

    offer.company = company.data()
    offer.company.id = company.id
    offer[userType1] = user1.data()
    offer[userType2] = user2.data()

    return offer
}

export const fetchSentOffers = userId => dispatch => {
    dispatch({ type: REQUEST_RESOURCE, resource: 'offers' })
    return api
        .fetchSentOffers(userId)
        .then(async offers => {
            const mappedOffers = await Promise.all(
                offers.map(offer => extractDataFromOffer(offer, 'fromUser','toUser'))
            )
            dispatch({ type: FETCH_RESOURCE_SUCCESS, resource: 'offers' })
            dispatch({ type: FETCH_OFFERS_SUCCESS, offers: mappedOffers, offersType: 'sent' })
            return mappedOffers
        })
}

export const fetchRecievedOffers = userId => dispatch => {
    dispatch({ type: REQUEST_RESOURCE, resource: 'offers' })
    return api
        .fetchRecievedOffers(userId)
        .then(async offers => {
            const mappedOffers = await Promise.all(
                offers.map(offer => extractDataFromOffer(offer, 'fromUser', 'toUser'))
            )
            dispatch({ type: FETCH_RESOURCE_SUCCESS, resource: 'offers' })
            dispatch({ type: FETCH_OFFERS_SUCCESS, offers: mappedOffers, offersType: 'recieved' })
            return mappedOffers
        })
}

export const acceptOffer = offerId => dispatch =>
    api.changeOfferStatus(offerId, 'accepted')
        .then(_ => dispatch({ type: CHANGE_OFFER_STATUS, status: 'accepted', offerId, offersType: 'recieved' }))

export const declineOffer = offerId => dispatch =>
    api.changeOfferStatus(offerId, 'declined')
        .then(_ => dispatch({ type: CHANGE_OFFER_STATUS, status: 'declined', offerId, offersType: 'recieved' }))

export const changeOfferStatus = (offerId, status) => dispatch =>
    api.changeOfferStatus(offerId, status)
        .then(_ => dispatch({ type: CHANGE_OFFER_STATUS, status, offerId, offersType: 'recieved' }))