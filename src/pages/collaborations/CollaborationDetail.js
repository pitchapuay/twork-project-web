import React from 'react'
import { connect } from 'react-redux'
import withAuthorization from 'components/hoc/withAuthorization'
import { withRouter } from 'react-router-dom'
import { Timestamp } from 'db'
import moment from 'moment'
import {
  subToCollaboration,
  joinCollaboration,
  subToProfile,
  leaveCollaboration,
  sendChatMessage,
  subToMessages,
  startCollaboration
} from 'actions'
import { getUserProfile, getProfileSnapshot } from 'api'
import ChatMessages from 'components/collaboration/ChatMessages'
import Spinner from 'components/Spinner'

class CollaborationDetail extends React.Component {

  state = {
    inputValue: '',
    reload: false,
    toUser: []
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth
    const { allowedPeople } = this.props




    // getUserProfile(collaboration.toUser)
    //   .then(p => {
    //     console.log('profile')
    //     console.log(p)
    //   })


    joinCollaboration(id, user.uid)
    this.watchCollabChanges(id)
    this.watchMessagesChanges(id)

  }

  watchCollabChanges = id => {
    this.unsubscribeFromCollab = this.props.subToCollaboration(id,
      ({ allowedPeople }) => {
        this.watchJoinedPeopleChanges(allowedPeople.map(jp => jp.id))
      })
  }

  watchJoinedPeopleChanges = ids => {
    this.peopleWatchers = {}
    ids.forEach(id => {
      this.peopleWatchers[id] = this.props.subToProfile(id)
    })
  }

  watchMessagesChanges = collabId => {
    this.unsubscribeFromMessages = this.props.subToMessages(collabId)
  }

  onKeyboardPress = (e) => {
    if (e.key === 'Enter') { this.onSendMessage(this.state.inputValue) }
  }

  onSendMessage = inputValue => {
    if (inputValue.trim() === '') { return }

    const timestamp = moment().format().slice(0, 19)
    const { user } = this.props.auth
    const { collaboration } = this.props
    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName
      },
      timestamp: timestamp,
      content: inputValue.trim()
    }
    this.props.sendChatMessage({ message, collabId: collaboration.id, timestamp })
      .then(_ => this.setState({ inputValue: '' }))
      .catch(error => {
        // this.setState({ inputValue: '' })
        alert(error)
      })
  }

  onStartCollaboration = collaboration => {
    const { id } = collaboration
    startCollaboration(id)
  }

  componentWillUnmount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth
    this.unsubscribeFromCollab()
    this.unsubscribeFromMessages()

    Object.keys(this.peopleWatchers).forEach(uid => this.peopleWatchers[uid]())
  }

  reloadPage = () => {
    this.setState({ reload: true })
  }

  render() {
    const { collaboration, messages, allowedPeople } = this.props
    const { inputValue } = this.state
    const { user } = this.props.auth


    const fromUser = Object.assign({}, allowedPeople[0])
    const toUser = Object.assign({}, allowedPeople[1])

    const status = 'notStarted'

    if (status === 'loading') { return <Spinner /> }

    return (
      <div className="content-wrapper">
        <div className="root">
          <div className="body">
            <div className="viewBoard">
              <div className="viewChatBoard">
                <h1 className="title is-3 has-text-weight-medium">ร้าน{collaboration.companyName}</h1>
                <div className="headerChatBoard">
                  {user.signupAs === 'employee' &&
                    <div className="headerChatUser">
                      <img className="viewAvatarItem"
                        src={toUser.avatar}
                        alt="icon avatar" />
                      <span className="textHeaderChatBoard">{toUser.fullName}</span>
                    </div>
                  }
                  {user.signupAs === 'owner' &&
                    <div className="headerChatUser">
                      <img className="viewAvatarItem"
                        src={fromUser.avatar}
                        alt="icon avatar" />
                      <span className="textHeaderChatBoard">{fromUser.fullName}</span>
                    </div>
                  }
                </div>
                <div className="viewListContentChat">
                  <ChatMessages
                    authUser={user}
                    messages={messages} />
                  <div style={{ float: "left", clear: "both" }}></div>
                </div>
                <div className="viewBottom">
                  <input
                    onChange={(e) => this.setState({ inputValue: e.target.value })}
                    onKeyPress={this.onKeyboardPress}
                    value={inputValue}
                    className="viewInput"
                    placeholder="พิมพ์ข้อความที่นี่..." />
                  <button
                    onClick={() => this.onSendMessage(inputValue)}
                    // disabled={status === 'finished' || status === 'notStarted'}
                    className="button is-primary is-large">ส่ง</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = () => ({
  subToCollaboration,
  subToProfile,
  subToMessages,
  sendChatMessage,
  getUserProfile
})

const mapStateToProps = ({ collaboration }) => {
  return {
    collaboration: collaboration.joined,
    allowedPeople: collaboration.allowedPeople,
    messages: collaboration.messages
  }
}

const Collaboration = withAuthorization(withRouter(CollaborationDetail))

export default connect(mapStateToProps, mapDispatchToProps())(Collaboration)

