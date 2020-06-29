import React from 'react'
import RecievedOfferItem from 'components/service/RecievedOfferItem'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withOwner from 'components/hoc/withOwner'
import { fetchRecievedOffers, changeOfferStatus, collaborate } from 'actions'
import { changeServiceQuantity, sendMessage } from 'api'
import { newCollaboration, acceptedAlert, declinedAlert } from 'helpers/offers'
import Spinner from 'components/Spinner'

class RecievedOffers extends React.Component {

    state = {
        redirect: false
    }

    componentDidMount() {
        const { auth } = this.props
        this.props.fetchRecievedOffers(auth.user.uid)
    }

    acceptOffer = (offer, offerId, serviceId) => {
        this.props.changeOfferStatus(offerId, 'accepted')
        changeServiceQuantity(serviceId)
        this.createCollaboration(offer)
    }

    declineOffer = (offer, offerId) => {
        this.props.changeOfferStatus(offerId, 'declined')
        const message = this.getDeclinedMessage(offer)
        sendMessage(message)
    }

    getDeclinedMessage = offer => {
        const { offers } = this.props
        const o = offers.find(of => { return of.fromUser === offer.fromUser })
        const user = o.fromUser
        const message = declinedAlert({ offer, fromUser: user })
        return message
    }
    
    createCollaboration = offer => {
        const { offers } = this.props
        const o = offers.find(of => { return of.fromUser === offer.fromUser })
        const user = o.fromUser
        const collaboration = newCollaboration({ offer, fromUser: user })
        const message = acceptedAlert({ offer, fromUser: user })
        this.props.collaborate({ collaboration, message })
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

    getCompanyName = (offers, id) => {
        const companyName = offers.find(offer => { return offer.companyId === id })
        return companyName
    }

    render() {
        const { offers, isFetching } = this.props
        const { id } = this.props.match.params
        // const company = this.getCompanyName(offers, id)

        if (isFetching) { return <Spinner /> }

        return (
            <div className="container">
                <div className="content-wrapper">
                    <h1 className="title">ผู้ที่สมัครงานร้าน</h1>
                    {!isFetching && offers.length === 0 &&
                        <span className="tag is-warning is-large">ขออภัย ขณะนี้ยังไม่มีผู้ที่สมัครงานร้านนี้</span>
                    }
                    <div className="columns is-multiline">
                        {offers.map(offer => (
                            offer.companyId === id &&
                            <div
                                key={offer.id}
                                className="column is-one-third">
                                <RecievedOfferItem
                                    className="offer-card"
                                    user={offer.fromUser}>
                                    <div className={`tag is-large ${this.statusClass(offer.status)}`}>
                                        {this.statusName(offer.status)}
                                    </div>
                                    <hr />
                                    <div className="service-offer">
                                        <div>
                                            <span className="label">เวลาที่สามารถทำงานได้</span>
                                            {offer.worktime.map(worktime =>
                                                <li key={worktime}>
                                                    {worktime}
                                                </li>
                                            )}
                                        </div>
                                    </div>
                                    {offer.status === 'pending' &&
                                        <div>
                                            <hr />
                                            <button onClick={() => this.acceptOffer(offer, offer.id, offer.companyId)}
                                                className="button is-success s-m-r">ยอมรับ</button>
                                            <button onClick={() => this.declineOffer(offer, offer.id)}
                                                className="button is-danger">ปฏิเสธ</button>
                                        </div>
                                    }
                                </RecievedOfferItem>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ offers }) => ({ offers: offers.recieved, isFetching: offers.isFetching })

const mapDispatchToProps = () => ({
    changeOfferStatus,
    fetchRecievedOffers,
    collaborate
})

const Offers = withOwner(withRouter(RecievedOffers))

export default connect(mapStateToProps, mapDispatchToProps())(Offers)
