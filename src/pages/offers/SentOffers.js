import React from 'react'
import SentOffersItem from 'components/service/SentOffersItem'
import { connect } from 'react-redux'
import { fetchSentOffers } from 'actions'
import Spinner from 'components/Spinner'
import withEmployee from 'components/hoc/withEmployee'

class SentOffers extends React.Component {

    componentDidMount() {
        const { auth } = this.props
        this.props.dispatch(fetchSentOffers(auth.user.uid))
    }

    statusClass = status => {
        if (status === 'pending') return 'is-warning'
        if (status === 'accepted') return 'is-success'
        if (status === 'declined') return 'is-danger'
    }

    statusName = status => {
        if (status === 'pending') return 'รอการตอบรับ'
        if (status === 'accepted') return 'ยอมรับ'
        if (status === 'declined') return 'ปฏิเสธ'
    }

    render() {
        const { offers, isFetching } = this.props

        if (isFetching) { return <Spinner /> }

        return (
            <div className="container">
                <div className="content-wrapper">
                    <h1 className="title">งานที่ฉันสมัคร</h1>
                    {!isFetching && offers.length === 0 &&
                        <span className="tag is-warning is-large">ขออภัย ขณะนี้คุณยังไม่ได้สมัครงานใดๆ</span>
                    }
                    <div className="columns is-multiline">
                        {offers.map(offer => (
                            <div
                                key={offer.id}
                                className="column is-one-third">
                                <SentOffersItem
                                    className="offer-card"
                                    company={offer.company}>
                                    <div className={`tag is-large ${this.statusClass(offer.status)}`}>
                                        {this.statusName(offer.status)}
                                    </div>
                                    {offer.company.quantity <= 0 &&
                                        <div className="card-warning">
                                            <p>ร้านนี้ปิดการรับสมัครแล้ว</p>
                                        </div>
                                    }
                                    <hr />
                                    <div className="service-offer">
                                        <div>
                                            <span className="label">ถึง:</span> {offer.toUser.fullName}
                                        </div>
                                        <div>
                                            <span className="label">เวลาที่สามารถทำงานได้:</span>
                                            {offer.worktime.map(worktime =>
                                                <li key={worktime}>
                                                    {worktime}
                                                </li>
                                            )}
                                        </div>
                                    </div>
                                </SentOffersItem>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = ({ offers }) => ({ offers: offers.sent, isFetching: offers.isFetching })

export default withEmployee(connect(mapStateToProps)(SentOffers))
