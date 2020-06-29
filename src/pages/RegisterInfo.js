/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { register } from 'actions'
import { useToasts } from 'react-toast-notifications'
import withAuthorization from 'components/hoc/withAuthorization'
import { storage, auth } from 'db'

const RegisterInfo = () => {

  const { addToast } = useToasts()
  const [redirect, setRedirect] = useState(false)
  const [picName, setPicName] = useState('')

  const res = auth.currentUser

  const [userProfile, setUserProfile] = useState({
    uid: res.uid,
    fullName: res.displayName,
    email: res.email,
    avatar: res.photoURL,
    signupAs: '',
    birthday: '',
    birthmonth: 'มกราคม',
    birthyear: '',
    age: '',
    address: '',
    phone: ''
  })

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    avatar: '',
    signupAs: '',
    birthday: '',
    birthyear: '',
    age: '',
    address: '',
    phone: '',
    career: '',
    target: '',
    experience: '',
    faculty: ''
  })

  const validate = () => {

    let fullName = ""
    let email = ""
    let signupAs = ""
    let birthday = ""
    let birthyear = ""
    let age = ""
    let address = ""
    let phone = ""
    let career = ""
    let target = ""
    let experience = ""
    let faculty = ""

    if (!userProfile.fullName) {
      fullName = "กรุณากรอกชื่อ-นามสกุล"
    }

    if (userProfile.fullName && userProfile.fullName.length <= 5) {
      fullName = "ชื่อ-นามสกุลควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"
    }

    if (userProfile.fullName && !userProfile.fullName.includes(' ')) {
      fullName = "กรุณาเว้นวรรคระหว่างชื่อและนามสกุล"
    }

    if (!userProfile.email) {
      email = 'กรุณากรอก Email'
    } else if (!/\S+@\S+\.\S+/.test(userProfile.email)) {
      email = 'E-mail ที่ท่านกรอกไม่ถูกต้อง'
    }

    if (!userProfile.birthday) {
      birthday = "กรุณากรอกวันเกิด"
    } else if (userProfile.birthday && (userProfile.birthday.length < 1 || userProfile.birthday.length > 31)) {
      birthday = "กรุณากรอกวันเกิดให้ถูกต้อง"
    }

    if (!userProfile.birthyear) {
      birthyear = "กรุณากรอกปีเกิด"
    } else if (userProfile.birthyear && userProfile.birthyear.length !== 4) {
      birthyear = "กรุณากรอกปีเกิดให้ถูกต้อง"
    }

    if (!userProfile.age) {
      age = "กรุณากรอกอายุ"
    }

    if (!userProfile.address) {
      address = "กรุณากรอกที่อยู่"
    } else if (userProfile.address && userProfile.address.length <= 10) {
      address = "ที่อยู่ควรมีความยาวไม่ต่ำกว่า 10 ตัวอักษร"
    }

    if (!userProfile.phone) {
      phone = "กรุณากรอกเบอร์ที่สามารถติดต่อได้"
    }

    if (!userProfile.signupAs) {
      signupAs = "กรุณาเลือกฐานะของสมาชิก"
    }

    if (userProfile.signupAs === 'employee') {
      if (!userProfile.faculty) {
        faculty = "กรุณากรอกสำนักวิชาที่กำลังศึกษาอยู่"
      } else if (userProfile.faculty && userProfile.faculty.length <= 5) {
        faculty = "สำนักวิชาที่กำลังศึกษาอยู่ควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"
      }
      if (!userProfile.experience) {
        experience = "กรุณากรอกประวัติการทำงาน หากไม่มี ให้กรอก -"
      }
      if (!userProfile.target) {
        target = "กรุณากรอกตำแหน่งที่สนใจ"
      } else if (userProfile.target && userProfile.target.length <= 5) {
        target = "ตำแหน่งที่สนใจควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"
      }
    } else if (userProfile.signupAs === 'owner') {
      if (!userProfile.career) {
        career = "กรุณากรอกอาชีพ"
      } else if (userProfile.career && userProfile.career.length <= 5) {
        career = "อาชีพควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร หากไม่มีให้กรอก ว่างงาน"
      }
    }

    if (fullName || email || signupAs || birthday || birthyear || age
      || address || phone || career || target || experience || faculty) {
      setErrors({
        fullName, email, signupAs, birthday, birthyear, age, 
        address, phone, career, target, experience, faculty
      })
      return false
    }
    return true
  }

  function handleOptionChange(e) {
    const item = e.target.value
    // console.log(item)
    switch (userProfile.signupAs) {
      case '': {
        if (item === 'employee') {
          setUserProfile({ ...userProfile, signupAs: item, myOffers: [] })
        } else if (item === 'owner') {
          setUserProfile({ ...userProfile, signupAs: item, myCompany: [] })
        }
        break
      }
      case 'owner': {
        if (item === 'employee') {
          delete userProfile.myCompany
          setUserProfile({ ...userProfile, signupAs: item, myOffers: [] })
        }
        break
      }
      case 'employee': {
        if (item === 'owner') {
          delete userProfile.myOffers
          setUserProfile({ ...userProfile, signupAs: item, myCompany: [] })
        }
        break
      }
      default: { }
    }
  }

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
      let isValid = validate()
      if (isValid) {
        const userProfileCopy = { ...userProfile }
        register(userProfileCopy)
          .then(
            _ => {
              setRedirect(true)
              addToast('สมัครสมาชิกสำเร็จ', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
            },
            errorMessage => addToast(errorMessage, { appearance: 'error', autoDismiss: false, autoDismissTimeout: 3000 }))
        isValid = false
      }
      isValid = false
    }

    if (redirect) { return <Redirect to="/" /> }


    return (
      <div className="create-page">
        <div className="container">
          <div className="form-container">
            <h1 className="title">สมัครสมาชิก</h1>

            <div className="field">
              <label className="label">รูปประจำตัว</label>
              <div className="control">
                <div className="columns is-vcentered">
                  <div className="column is-2 is-one-quarter">
                    <div className="media-center">
                      <figure className="image is-128x128">
                        <img className="is-rounded" src={userProfile.avatar} alt={userProfile.avatar} />
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
                      {userProfile.avatar === res.photoURL &&
                        <span className="file-name">No file uploaded.</span>
                      }
                      {userProfile.avatar !== res.photoURL &&
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
                    className={`input ${errors.fullName && 'is-danger'}`}
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    required
                  />
                  {errors.fullName && (
                    <p className="help is-danger">{errors.fullName}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">E-mail</label>
                  <input
                    onChange={handleChange}
                    name="email"
                    defaultValue={userProfile.email}
                    className={`input ${errors.email && 'is-danger'}`}
                    type="text"
                    placeholder="E-mail"
                    required
                  />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
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
                        className={`input ${errors.birthday && 'is-danger'}`}
                        type="number"
                        placeholder="วัน"
                        required
                      />
                      {errors.birthday && (
                        <p className="help is-danger">{errors.birthday}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="column is-2">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select name="birthmonth" onChange={handleChange}>
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
                        className={`input ${errors.birthyear && 'is-danger'}`}
                        type="number"
                        placeholder="ปีพ.ศ."
                        required
                      />
                      {errors.birthyear && (
                        <p className="help is-danger">{errors.birthyear}</p>
                      )}
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
                    className={`input ${errors.age && 'is-danger'}`}
                    type="number"
                    placeholder="อายุ"
                    required
                  />
                  {errors.age && (
                    <p className="help is-danger">{errors.age}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">ที่อยู่</label>
                  <textarea
                    onChange={handleChange}
                    name="address"
                    className={`textarea ${errors.address && 'is-danger'}`}
                    placeholder="ที่อยู่"
                    required
                  ></textarea>
                  {errors.address && (
                    <p className="help is-danger">{errors.address}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">เบอร์ที่สามารถติดต่อได้</label>
                  <input
                    onChange={handleChange}
                    name="phone"
                    className={`input ${errors.phone && 'is-danger'}`}
                    type="text"
                    placeholder="เบอร์โทร"
                    required
                  />
                  {errors.phone && (
                    <p className="help is-danger">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="field">
                <label className="label">คุณต้องการสมัครสมาชิกในฐานะ : </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="signupAs"
                    value="employee"
                    onChange={handleOptionChange}
                    checked={userProfile.signupAs === 'employee'} />
                  นักศึกษา
              </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="signupAs"
                    value="owner"
                    onChange={handleOptionChange}
                    checked={userProfile.signupAs === 'owner'} />
                  ผู้ประกอบการ
              </label>
              </div>
              {errors.signupAs && (
                <p className="help is-danger">{errors.signupAs}</p>
              )}

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
                        className={`input ${errors.faculty && 'is-danger'}`}
                        type="text"
                        placeholder="สำนักวิชา"
                        required
                      />
                      {errors.faculty && (
                        <p className="help is-danger">{errors.faculty}</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">ประวัติการทำงาน</label>
                      <textarea
                        onChange={handleChange}
                        name="experience"
                        className={`textarea ${errors.experience && 'is-danger'}`}
                        placeholder="ประวัติการทำงาน"
                        required
                      ></textarea>
                      {errors.experience && (
                        <p className="help is-danger">{errors.experience}</p>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">ตำแหน่งที่สนใจ</label>
                      <input
                        onChange={handleChange}
                        name="target"
                        className={`input ${errors.target && 'is-danger'}`}
                        type="textarea"
                        placeholder="ตำแหน่งที่สนใจ"
                        required
                      />
                      {errors.target && (
                        <p className="help is-danger">{errors.target}</p>
                      )}
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
                        className={`input ${errors.career && 'is-danger'}`}
                        type="text"
                        placeholder="อาชีพ"
                        required
                      />
                      {errors.career && (
                        <p className="help is-danger">{errors.career}</p>
                      )}
                    </div>
                  </div>

                </div>
              }

              {/* create button */}
              <br />
              < div className="field is-grouped" >
                <div className="control">
                  <button
                    onClick={registerUser}
                    type="button"
                    className="button is-medium is-success">สมัครสมาชิก</button>
                </div>
                <div className="control">
                  <button className="button is-medium is-danger">ยกเลิก</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  export default withAuthorization(RegisterInfo)






