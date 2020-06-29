import {
    COLLABORATION_CREATED_FROM_OFFER,
    FETCH_ALERT_SUCCESS,
    SET_COLLABORATION,
    SET_COLLABORATION_ALLOWED_PEOPLE,
    UPDATE_COLLABORATION_USER,
    SET_COLLABORATION_MESSAGES,
    RESET_COLLABORATION_MESSAGES
} from 'types'

import * as api from 'api'
import { createRef } from 'actions'

export const collaborate = ({ collaboration, message }) => dispatch =>
    api.createCollaboration(collaboration)
        .then(collabId => {
            api.sendMessage(message)
            dispatch({
                type: COLLABORATION_CREATED_FROM_OFFER,
                offerId: collaboration.fromOffer,
                offersType: 'recieved'
            })
            return collabId
        })

export const subscribeToMessages = userId => dispatch => {
    api.getUserId(userId)
        .then(uid => {
            api.subscribeToMessages(uid, messages => dispatch({ type: FETCH_ALERT_SUCCESS, messages }))
        })
}


// export const markMessageAsRead = message => dispatch =>
//     api.markMessageAsRead(message)
//         .then(_ => dispatch({ type: MARK_MESSAGE_AS_READ, messageId: message.id }))

// export const markMessageAsRead = message => api.markMessageAsRead(message)

export const fetchCollaborations = userId => api.fetchCollaborations(userId)

export const subToCollaboration = (collabId, done) => dispatch =>
    api.subToCollaboration(collabId, async collaboration => {
        let allowedPeople = []

        if (collaboration.allowedPeople) {
            allowedPeople = await Promise.all(
                collaboration.allowedPeople.map(async userId => {
                    const userRef = createRef('profiles', userId)
                    const userSnapshot = await userRef.get()
                    return { id: userSnapshot.id, ...userSnapshot.data() }
                })
            )
        }
        dispatch({ type: SET_COLLABORATION, collaboration })
        dispatch({ type: SET_COLLABORATION_ALLOWED_PEOPLE, allowedPeople })
        done({ allowedPeople })
    })

export const joinCollaboration = (collabId, userId) => api.joinCollaboration(collabId, userId)
export const leaveCollaboration = (collabId, userId) => api.leaveCollaboration(collabId, userId)

export const subToProfile = uid => dispatch =>
    api.subToProfile(uid, user =>
        dispatch({ type: UPDATE_COLLABORATION_USER, user }))

export const sendChatMessage = message => dispatch => {
    return api
        .sendChatMessage(message)
        .catch(err => {
            dispatch({ messageId: message.timestamp })
            return Promise.reject('Collaboration is expired!')
        })
}

export const subToMessages = collabId => dispatch => {
    dispatch({ type: RESET_COLLABORATION_MESSAGES })
    return api.subToMessages(collabId, messages => {
        dispatch({ type: SET_COLLABORATION_MESSAGES, messages })
    })
}

export const startCollaboration = (collabId) =>
    api.startCollaboration(collabId)