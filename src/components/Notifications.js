import React, { useState, useEffect } from 'react'
import { alertOwner, alertEmployee } from 'api'

const Notifications = ({ user }) => {

    const [invite, setInvite] = useState([])

    useEffect(() => {
        if (user.signupAs === 'owner') {
            alertOwner(user.uid)
                .then(al => {
                    setInvite(al)
                })
        } else if (user.signupAs === 'employee') {
            alertEmployee(user.uid)
                .then(al => {
                    // console.log(al)
                    setInvite(al)
                })
        }
    }, [])

    return (
        <div>
            {user.signupAs === 'owner' &&
                invite.map(a => (
                    <div key={a.id}>
                        <div className="navbar-item navbar-item-message">
                            <div className="media">
                                <div className="media-left">
                                    <img
                                        className="profile-image"
                                        src={a.fromUser.avatar}
                                        alt="" />
                                </div>
                                <div className="media-content">
                                    <p className="subtitle is-6">{a.text}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))
            }
            {user.signupAs === 'employee' && invite.length > 0 &&
                invite.map(a => (
                    <div key={a.id}>
                        <div className="navbar-item navbar-item-message">
                            <div className="media">
                                <div className="media-left">
                                    <img
                                        className="profile-image"
                                        src={a.company.image}
                                        alt="" />
                                </div>
                                <div className="media-content">
                                    <p className="subtitle is-6">{a.text}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))
            }
            {invite.length === 0 &&
                <div className="navbar-item">ไม่มีการแจ้งเตือน</div>
            }
        </div>
    )
}
export default Notifications