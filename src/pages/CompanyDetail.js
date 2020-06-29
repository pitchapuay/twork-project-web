import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchServiceById } from '../actions'
import Spinner from '../components/Spinner'
import OfferModal from 'components/service/OfferModal'

const CompanyDetail = props => {

    const { serviceId } = useParams()
    const { fetchServiceById, isFetching } = props

    useEffect(() => {
        fetchServiceById(serviceId)
    }, [serviceId, fetchServiceById])

    const { company, auth } = props
    const { user } = company

    if (isFetching || serviceId !== company.id) { return <Spinner /> }

    return (
        <section className="hero is-fullheight is-default is-bold service-detail-page">
            <div className="hero-body">
                <div className="container has-text-centered">
                    {/* <div className="content-wrapper"> */}

                    <h1 className="title service-title is-2">
                        {company.companyName}
                    </h1>
                    <div className="tag is-large service-category">
                        {company.category}
                    </div>

                    <div className="media-center">
                        <figure className="image is-4by3">
                            <img src={company.image} alt="Description" />
                        </figure>
                    </div>
                    <br />
                    <h1 className="subtitle is-4">
                        {company.description}
                    </h1>
                    <hr />

                    {/* owner header */}
                    <div className="columns is-vcentered">
                        <div className="column is-6 is-offset-2">
                            {/* <div className="service-header-container"> */}
                                <div className="media service-user">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <img
                                                className="is-rounded"
                                                src={user.avatar}
                                                alt={user.fullName} />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{user.fullName}</p>
                                        <p className="subtitle is-6">ผู้ประกอบการ</p>
                                    </div>
                                </div>
                            {/* </div> */}
                        </div>
                        <div className="column is-3">
                            <Link
                                to={`/profile/${user.uid}`}
                                className="button btn-align-md is-info is-outlined">ดูข้อมูลส่วนตัวทั้งหมด</Link>
                        </div>
                    </div>
                    <br/>

                    {/* end owner header */}
                    <div className="columns">
                        <div className="column is-offset-3 is-3">
                            <h1 className="title is-5 has-text-left">
                                แผนที่ตั้งร้าน
                                    </h1>
                        </div>
                        <div className="column">
                            <p className="subtitle is-5 has-text-left">{company.map}</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-offset-3 is-3">
                            <h1 className="title is-5 has-text-left">
                                ตำแหน่งว่าง
                            </h1>
                        </div>
                        <div className="column">
                            <p className="subtitle is-5 has-text-left">{company.position}</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-offset-3 is-3">
                            <h1 className="title is-5 has-text-left">
                                จำนวนตำแหน่งว่าง
                            </h1>
                        </div>
                        <div className="column">
                            <p className="subtitle is-5 has-text-left">{company.quantity} อัตรา</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-offset-3 is-3">
                            <h1 className="title is-5 has-text-left">
                                คุณสมบัติ
                            </h1>
                        </div>
                        <div className="column">
                            <p className="subtitle is-5 has-text-left">{company.qualification}</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-offset-3 is-3">
                            <h1 className="title is-5 has-text-left">
                                ค่าจ้าง
                            </h1>
                        </div>
                        <div className="column">
                            <p className="subtitle is-5 has-text-left">{company.salary} บาท/วัน</p>
                        </div>
                    </div>
                    <br />
                    <div className="has-text-centered">
                        {auth.user.signupAs === 'employee' &&
                            <OfferModal
                                auth={auth}
                                company={company} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = ({ selectedService, auth }) => (
    {
        company: selectedService.item,
        isFetching: selectedService.isFetching,
        auth
    }
)

export default connect(mapStateToProps, { fetchServiceById })(CompanyDetail)