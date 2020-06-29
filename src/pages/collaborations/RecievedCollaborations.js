import React from 'react'
import { Link } from "react-router-dom"
import withAuthorization from 'components/hoc/withAuthorization'
import { getUserProfile } from 'api'
import { fetchCollaborations } from 'actions'

class RecievedCollaborations extends React.Component {

    state = {
        collaborations: []
    }

    reloadPage = () => {
        this.setState({ reload: true })
    }

    componentDidMount() {
        const { auth: { user } } = this.props
        fetchCollaborations(user.uid)
            .then(collaborations => {
                collaborations.map(c => {
                    if (user.signupAs === 'owner') {
                        var id = c.fromUser
                    } else if (user.signupAs === 'employee') {
                        var id = c.toUser
                    }
                    getUserProfile(id)
                        .then(u => {
                            var arr = Object.assign({}, c, { u })
                            // console.log(arr)
                            this.setState(prevState => ({
                                collaborations: [...prevState.collaborations, arr],
                            }))
                        })
                })
            })
    }

    renderCollaborations = (collaborations) => {
        return collaborations.map(c => {
            return (
                <article
                    key={c.id}
                    className="post">
                    <div className="media">
                        <div className="columns">
                            <div className="column is-10">
                                <div className="media service-user">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <img
                                                className="is-rounded"
                                                src={c.u.avatar}
                                                alt="avatar" />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{c.u.fullName}</p>
                                        <p className="subtitle is-6">ร้าน {c.companyName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-offset-12">
                                <div className="media-right">
                                    <span className="has-text-grey-light">
                                        <Link to={`/collaborations/${c.id}`}>
                                            <button className="button">เข้าสู่หน้าแชท</button>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div >
                    <hr />
                </article >
            )
        })
    }

    render() {
        const { collaborations } = this.state
        return (
            <div className="content-wrapper">
                <div className="container">
                    <h1 className="title">กล่องข้อความ</h1>
                    {collaborations.length === 0 &&
                        <span className="tag is-warning is-large">ไม่มีข้อความ</span>
                    }
                    {collaborations.length > 0 &&
                        <div className="box content">
                            {this.renderCollaborations(collaborations)}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withAuthorization(RecievedCollaborations)