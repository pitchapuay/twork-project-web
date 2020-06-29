import { combineReducers } from 'redux'
import services from '../reducers/services'
import selectedService from '../reducers/selectedService'
import auth from './auth'
import offers from './offers'
import collaboration from './collaboration'

const serviceApp = combineReducers({
    services,
    selectedService,
    auth,
    offers,
    collaboration
})

export default serviceApp