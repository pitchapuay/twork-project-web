/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import { connect } from 'react-redux'
import ServiceItem from '../components/service/ServiceItem'
import Hero from '../components/Hero'
import { fetchServices } from '../actions'

class Home extends React.Component {

  state = {
    services: [],
    isSignedIn: false
  }

  componentDidMount() {
    this.props.fetchServices()
  }

  renderServices = (services) =>
    services.map(company => <ServiceItem key={company.id} company={company} />)

  render() {
    const { services } = this.props

    return (
      <div>
        <Hero />
        <section className="section section-feature-grey">
          <div className="container">
            <div className="title-wrapper has-text-centered">
              <h2 className="title is-2">ร้านที่กำลังเปิดรับสมัคร</h2>
              <h3 className="subtitle is-5 is-muted">ดูรายละเอียดร้านค้าและสมัครเข้าทำงานไปกับ Twork</h3>
              <div className="divider is-centered"></div>
            </div>

            <div className="content-wrapper">
              <div className="columns is-multiline">
                {this.renderServices(services)}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({ services: state.services.all })

export default connect(mapStateToProps, { fetchServices })(Home)