/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { register } from 'actions'
import { useToasts } from 'react-toast-notifications'
import withAuthorization from 'components/hoc/withAuthorization'
import { storage } from 'db'

const EditProfile = props => {

  const { auth: { user } } = props

  const { addToast } = useToasts()
  const [redirect, setRedirect] = useState(false)
  const [picName, setPicName] = useState('')

  const [userProfile, setUserProfile] = useState({
    uid: user.uid,
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar,
    signupAs: user.signupAs
  })

  function handleImage(event) {
    let file = event.target.files[0]
    setPicName(file.name)
    var metadata = {
      contentType: 'image/jpg',
    }
    var uploadTask = storage.ref(`/profilePic/${file.name}`).put(file, metadata)
    uploadTask.on('state_changed',
      (snapShot) => {
        console.log(snapShot)
      }, (err) => {
        console.log(err)
      }, () => {
        storage.ref('profilePic').child(file.name).getDownloadURL()
          .then(fireBaseUrl => {
            setUserProfile({ ...userProfile, avatar: fireBaseUrl })
          })
      })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUserProfile({ ...userProfile, [name]: value })
  }


  const registerUser = () => {
    const userProfileCopy = { ...userProfile }
    register(userProfileCopy)
      .then(
        _ => {
          setRedirect(true)
          addToast('แก้ไขประวัติส่วนตัวสำเร็จ', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
        },
        errorMessage => addToast(errorMessage, { appearance: 'error', autoDismiss: false, autoDismissTimeout: 3000 }))
  }

  if (redirect) { return <Redirect to="/" /> }


  return (
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">แก้ไขประวัติส่วนตัว</h1>

          <div className="field">
            <label className="label">รูปประจำตัว</label>
            <div className="control">

              <div className="columns is-vcentered">
                <div className="column is-2 is-one-quarter">
                  <div className="media-center">
                    <figure className="image is-128x128">
                      <img className="is-rounded"
                        src={userProfile.avatar}
                        alt={userProfile.avatar} />
                    </figure>
                  </div>
                </div>
                <div className="column">
                  <label className="file-label">
                    <input
                      onChange={handleImage}
                      name="image"
                      className="file-input"
                      type="file" />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">เลือกไฟล์เพื่อเปลี่ยนรูปประจำตัว</span>
                    </span>
                    {userProfile.avatar === user.avatar &&
                      <span className="file-name">No file uploaded.</span>
                    }
                    {userProfile.avatar !== user.avatar &&
                      <span className="file-name">{picName}</span>
                    }
                  </label>
                </div>
              </div>


            </div>
          </div>
          <form>
            <div className="field">
              <div className="control">
                <label className="label">ชื่อ-นามสกุล</label>
                <input
                  onChange={handleChange}
                  name="fullName"
                  defaultValue={userProfile.fullName}
                  className="input"
                  type="text"
                  placeholder="ชื่อ-นามสกุล" />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">E-mail</label>
                <input
                  onChange={handleChange}
                  name="email"
                  defaultValue={userProfile.email}
                  className="input"
                  type="text"
                  placeholder="E-mail" />
              </div>
            </div>
            <label className="label">วัน/เดือน/ปีเกิด</label>
            <div className="columns">
              <div className="column is-2">
                <div className="field">
                  <div className="control">
                    <input
                      onChange={handleChange}
                      name="birthday"
                      defaultValue={user.birthday}
                      className="input"
                      type="number"
                      placeholder="วัน" />
                  </div>
                </div>
              </div>
              <div className="column is-2">
                <div className="field">
                  <div className="control">
                      <div className="select">
                        <select name="birthmonth" onChange={handleChange} defaultValue={user.birthmonth}>
                          <option value="มกราคม">มกราคม</option>
                          <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                          <option value="มีนาคม">มีนาคม</option>
                          <option value="เมษายน">เมษายน</option>
                          <option value="พฤษภาคม">พฤษภาคม</option>
                          <option value="มิถุนายน">มิถุนายน</option>
                          <option value="กรกฎาคม">กรกฎาคม</option>
                          <option value="สิงหาคม">สิงหาคม</option>
                          <option value="กันยายน">กันยายน</option>
                          <option value="ตุลาคม">ตุลาคม</option>
                          <option value="พฤศจิกายน">พฤศจิกายน</option>
                          <option value="ธันวาคม">ธันวาคม</option>
                        </select>
                      </div>
                  </div>
                </div>
              </div>
              <div className="column is-2">
                <div className="field">
                  <div className="control">
                    <input
                      onChange={handleChange}
                      name="birthyear"
                      defaultValue={user.birthyear}
                      className="input"
                      type="number"
                      placeholder="ปีพ.ศ." />
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="label">อายุ</label>
                <input
                  onChange={handleChange}
                  name="age"
                  defaultValue={user.age}
                  className="input"
                  type="text"
                  placeholder="อายุ" />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">ที่อยู่</label>
                  <textarea
                    onChange={handleChange}
                    name="address"
                    className="textarea"
                    defaultValue={user.address}
                    placeholder="ที่อยู่"
                    required
                  ></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">เบอร์ที่สามารถติดต่อได้</label>
                <input
                  onChange={handleChange}
                  name="phone"
                  defaultValue={user.phone}
                  className="input"
                  type="text"
                  placeholder="เบอร์โทร" />
              </div>
            </div>
            <br/>

            {/* more employee information */}
            {userProfile.signupAs === 'employee' &&
              <div>
                <div className="columns is-vcentered">
                  <div className="column is-2">
                    <span className="tag is-medium is-info is-light is-rounded">สำหรับนักศึกษา</span>
                  </div>
                  <div className="column">
                    <h2>กรุณากรอกข้อมูลเพิ่มเติม</h2>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <label className="label">สำนักวิชาที่กำลังศึกษาอยู่</label>
                    <input
                      onChange={handleChange}
                      name="faculty"
                      defaultValue={user.faculty}
                      className="input"
                      type="text"
                      placeholder="สำนักวิชา" />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">ประวัติการทำงาน</label>
                    <input
                      onChange={handleChange}
                      name="experience"
                      defaultValue={user.experience}
                      className="input"
                      type="textarea"
                      placeholder="ประวัติการทำงาน" />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">ตำแหน่งที่สนใจ</label>
                    <input
                      onChange={handleChange}
                      name="target"
                      defaultValue={user.target}
                      className="input"
                      type="textarea"
                      placeholder="ตำแหน่งที่สนใจ" />
                  </div>
                </div>


              </div>
            }

            {/* more owner information */}
            {userProfile.signupAs === 'owner' &&
              <div>

                <div className="columns is-vcentered">
                  <div className="column is-one-fifth">
                    <span className="tag is-medium is-info is-light is-rounded">สำหรับผู้ประกอบการ</span>
                  </div>
                  <div className="column">
                    <p>กรุณากรอกข้อมูลเพิ่มเติม</p>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <label className="label">อาชีพ</label>
                    <input
                      onChange={handleChange}
                      name="career"
                      defaultValue={user.career}
                      className="input"
                      type="text"
                      placeholder="อาชีพ" />
                  </div>
                </div>

              </div>
            }

            {/* create button */}
            <br/>
            < div className="field is-grouped" >
              <div className="control">
                <button
                  onClick={registerUser}
                  type="button"
                  className="button is-medium is-success">แก้ไขประวัติส่วนตัว</button>
              </div>
              <div className="control">
                <button className="button is-medium is-danger">ยกเลิก</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default withAuthorization(EditProfile)






