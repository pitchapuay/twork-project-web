import React from 'react'
import withEmployee from 'components/hoc/withEmployee'

const Services = () =>
    <h1>I am Services Page, only EMPLOYEE user can see me!</h1>

export default withEmployee(Services)