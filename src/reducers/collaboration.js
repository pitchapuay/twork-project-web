import { combineReducers } from 'redux'
import {
    SET_COLLABORATION,
    SET_COLLABORATION_ALLOWED_PEOPLE,
    UPDATE_COLLABORATION_USER,
    SET_COLLABORATION_MESSAGES,
    RESET_COLLABORATION_MESSAGES
} from 'types'

const initCollab = () => {
    const collaboration = (state = {}, action) => {
        switch (action.type) {
            case SET_COLLABORATION:
                return action.collaboration
            default:
                return state
        }
    }

    const allowedPeople = (state = [], action) => {
        switch (action.type) {
            case SET_COLLABORATION_ALLOWED_PEOPLE:
                return action.allowedPeople
            case UPDATE_COLLABORATION_USER:
                const newAllowedPeople = [...state]
                const { user } = action
                const index = newAllowedPeople.findIndex(ap => ap.uid === user.uid)

                if (index < 0) { return state }
                if (newAllowedPeople[index].state === user.state) { return state }

                newAllowedPeople[index].state = user.state
                return newAllowedPeople
            default:
                return state
        }
    }

    const messages = (state = [], action) => {
        switch (action.type) {
            case SET_COLLABORATION_MESSAGES:
                const newMessages = [...state]

                action.messages.forEach(change => {
                    if (change.type === 'added') {
                        newMessages.push({ id: change.doc.id, ...change.doc.data() })
                    }
                })
                return newMessages
            case RESET_COLLABORATION_MESSAGES:
                return []
            default:
                return state
        }
    }
    return combineReducers({
        joined: collaboration,
        allowedPeople,
        messages
    })
}

const collaboration = initCollab()
export default collaboration