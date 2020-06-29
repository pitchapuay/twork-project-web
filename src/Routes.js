import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import ProfilePage from './pages/Profile'
import ServicesPage from './pages/Services'
import CompanyDetailPage from './pages/CompanyDetail'
import LoginPage from './pages/Login'
import LogoutPage from './pages/Logout'
import RegisterPage from './pages/Register'
import RegisterInfoPage from './pages/RegisterInfo'
import EditProfilePage from './pages/EditProfile'
import SecretPage from './pages/Secret'

import CompanyCreatePage from './pages/services/CompanyCreate'
import UserCompaniesPage from './pages/services/UserCompanies'

import SentOffersPage from './pages/offers/SentOffers'
import RecievedOffersPage from './pages/offers/RecievedOffers'
import RecievedCollaborationsPage from './pages/collaborations/RecievedCollaborations'
import CollaborationDetailPage from './pages/collaborations/CollaborationDetail'

const Routes = () =>
    <Switch>
        <Route path="/secret">
            <SecretPage />
        </Route>
        <Route path="/register">
            <RegisterPage />
        </Route>
        <Route path="/registerinfo">
            <RegisterInfoPage />
        </Route>
        <Route path="/editprofile">
            <EditProfilePage />
        </Route>
        <Route path="/login">
            <LoginPage />
        </Route>
        <Route path="/logout">
            <LogoutPage />
        </Route>
        <Route path="/collaborations/me">
            <RecievedCollaborationsPage />
        </Route>
        <Route path="/collaborations/:id">
            <CollaborationDetailPage />
        </Route>
        <Route path="/offers/sent">
            <SentOffersPage />
        </Route>
        <Route path="/offers/recieved/:id">
            <RecievedOffersPage />
        </Route>
        <Route path="/services/me">
            <UserCompaniesPage />
        </Route>
        <Route path="/services/createcompany">
            <CompanyCreatePage />
        </Route>
        <Route path="/services/:serviceId">
            <CompanyDetailPage />
        </Route>
        <Route path="/services">
            <ServicesPage />
        </Route>
        <Route path="/profile/:userId">
            <ProfilePage />
        </Route>
        <Route path="/">
            <HomePage />
        </Route>
    </Switch>

export default Routes