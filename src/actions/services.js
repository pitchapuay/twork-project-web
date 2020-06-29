import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICE_SUCCESS,
  REQUEST_SERVICE,
  FETCH_USER_SERVICES_SUCCESS
} from '../types'

import * as api from 'api'


export const fetchServices = () => dispatch =>
  api
    .fetchServices()
    .then(services => dispatch(
      {
        type: FETCH_SERVICES_SUCCESS,
        services
      }))

export const fetchUserCompanies = userId => dispatch =>
  api.fetchUserCompanies(userId).then(services =>
    dispatch({ type: FETCH_USER_SERVICES_SUCCESS, services }))

export const fetchServiceById = serviceId => (dispatch, getState) => {

  const lastService = getState().selectedService.item

  if (lastService.id && lastService.id === serviceId) { return Promise.resolve() }

  dispatch({ type: REQUEST_SERVICE })
  return api
    .fetchServiceById(serviceId)
    .then(async service => {
      // service.user = await api.getUserProfile(service.user)
      const user = await service.user.get()
      service.user = user.data()
      service.user.id = user.id
      dispatch({ type: FETCH_SERVICE_SUCCESS, service })
    }
    )
}

export const addServicesToProfiles = (newServices, serviceId) => {
  newServices.services = api.createRef('services', serviceId) // อยู่ในฟิลด์ user -> บอกว่าของใคร ใครสร้างขึ้นมา
  return api.addServicesToProfiles(newServices)
}

export const createCompany = (newCompany, userId, state) => {
  var string = state.date.concat(" ", state.startHr, ".", state.startMin, "-", state.endHr, ".", state.endMin, " น.")
  var w = newCompany.worktime
  w = w.splice(w.length, 0, string)
  newCompany.salary = parseInt(newCompany.salary, 10)
  newCompany.quantity = parseInt(newCompany.quantity, 10)
  newCompany.user = api.createRef('profiles', userId) // อยู่ในฟิลด์ user -> บอกว่าของใคร ใครสร้างขึ้นมา
  return api.createCompany(newCompany)
}