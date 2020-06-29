import React from 'react'
import { getUserProfile } from 'api'
import { withRouter, Link } from 'react-router-dom'
import withAuthorization from 'components/hoc/withAuthorization'

class Profile extends React.Component {

  state = {
    userProfile: {}
  }

  componentDidMount() {
    const { userId } = this.props.match.params
    getUserProfile(userId)
      .then(user =>
        this.setState({ userProfile: user })
      )
  }

  render() {
    const { userProfile } = this.state
    const { userId } = this.props.match.params
    const { auth } = this.props
    // console.log(auth)
    return (
      <section className="hero is-fullheight is-default is-bold service-detail-page">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title has-text-left">ประวัติส่วนตัว</h1>

            {/* <div className="columns is-desktop is-vcentered"> */}
                <figure className="image is-128x128 is-inline-block">
                  <img
                    className="is-rounded"
                    src={userProfile.avatar}
                    alt="avatar" />
                </figure>
            {/* </div> */}
            <div className="column">
              <h1 className="title service-title is-2">
                {userProfile.fullName}
              </h1>
              <div className="tag is-large service-category">
                {userProfile.signupAs === 'employee' ? 'นักศึกษา' : ''} {userProfile.signupAs === 'owner' ? 'ผู้ประกอบการ' : ''}
              </div>
              <hr/>
              <div className="columns">
                <div className="column is-3 is-offset-one-third">
                  <h1 className="title is-5 has-text-left">
                    อายุ
                  </h1>
                </div>
                <div className="column">
                  <p className="subtitle is-5 has-text-left">{userProfile.age}</p>
                </div>
              </div>

              <div className="columns">
                <div className="column is-3 is-offset-one-third">
                  <h1 className="title is-5 has-text-left">
                    วัน/เดือน/ปีเกิด
                  </h1>
                </div>
                <div className="column">
                  <p className="subtitle is-5 has-text-left">
                    {userProfile.birthday} {userProfile.birthmonth} พ.ศ.{userProfile.birthyear}</p>
                </div>
              </div>
              <div className="columns">
                <div className="column is-3 is-offset-one-third">
                  <h1 className="title is-5 has-text-left">
                    เบอร์ที่สามารถติดต่อได้
                  </h1>
                </div>
                <div className="column">
                  <p className="subtitle is-5 has-text-left">{userProfile.phone}</p>
                </div>
              </div>
              <div className="columns">
                <div className="column is-3 is-offset-one-third">
                  <h1 className="title is-5 has-text-left">
                    E-mail
                  </h1>
                </div>
                <div className="column">
                  <p className="subtitle is-5 has-text-left">{userProfile.email}</p>
                </div>
              </div>
              <div className="columns">
                <div className="column is-3 is-offset-one-third">
                  <h1 className="title is-5 has-text-left">
                    ที่อยู่
                  </h1>
                </div>
                <div className="column">
                  <p className="subtitle is-5 has-text-left">{userProfile.address}</p>
                </div>
              </div>
              {userProfile.signupAs === 'employee' &&
                <div>
                  <div className="columns">
                    <div className="column is-3 is-offset-one-third">
                      <h1 className="title is-5 has-text-left">
                        สำนักวิชาที่กำลังศึกษาอยู่
                  </h1>
                    </div>
                    <div className="column">
                      <p className="subtitle is-5 has-text-left">{userProfile.faculty}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-3 is-offset-one-third">
                      <h1 className="title is-5 has-text-left">
                        ประวัติการทำงาน
                  </h1>
                    </div>
                    <div className="column">
                      <p className="subtitle is-5 has-text-left">{userProfile.experience}</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-3 is-offset-one-third">
                      <h1 className="title is-5 has-text-left">
                        ตำแหน่งที่สนใจ
                  </h1>
                    </div>
                    <div className="column">
                      <p className="subtitle is-5 has-text-left">{userProfile.target}</p>
                    </div>
                  </div>
                </div>
              }
              {userProfile.signupAs === 'owner' &&
                <div>
                  <div className="columns">
                    <div className="column column is-3 is-offset-one-third">
                      <h1 className="title is-5 has-text-left">
                        อาชีพ
                  </h1>
                    </div>
                    <div className="column">
                      <p className="subtitle is-5 has-text-left">{userProfile.career}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
            <br />
            <div className="has-text-centered">
              {auth.user.uid === userId &&
                <Link
                  to={'/editprofile'}
                  className="button accent-btn is-focused is-rounded">
                  แก้ไขประวัติส่วนตัว
              </Link>
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const profile = withAuthorization(withRouter(Profile))

export default profile