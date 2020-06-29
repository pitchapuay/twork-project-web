import React from 'react'
import { fetchUserCompanies } from 'actions'
import withOwner from 'components/hoc/withOwner'
import MyCompanyItem from 'components/service/MyCompanyItem'

class UserCompanies extends React.Component {

    componentDidMount() {
        const { auth: { user }, dispatch } = this.props
        dispatch(fetchUserCompanies(user.uid))
    }

    render() {
        const { services } = this.props.auth
        return (
            <div className="container">
                <div className="content-wrapper">
                    <h1 className="title">จัดการร้านของฉัน</h1>
                    <div className="columns is-multiline">
                        {
                            services.map(s => ( // services มาจาก field ใน database
                                <div key={s.id} className="column">
                                    <MyCompanyItem company={s} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withOwner(UserCompanies)