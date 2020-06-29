// /* eslint no-useless-escape: 0 */

// import React, { useState } from 'react'
// import firebase from 'firebase/app'
// import 'firebase/auth'


// const RegisterForm = (props) => {

//     const res = firebase.auth().currentUser

//     const [profileForm, setProfileForm] = useState({
//         fullName: '',
//         email: '',
//         avatar: '',
//         uid: res.uid,
//         signupAs: ''
//     })

//     const handleChange = e => {
//         const { name, value } = e.target
//         setServiceForm({ ...serviceForm, [name]: value })
//     }

//     const handleSubmit = () => {
//         const { user } = auth
//         createCompany(serviceForm, user.uid)
//             .then(() => setRedirect(true))
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     return (
//         <div className="create-page">
//             <div className="container">
//                 <div className="form-container">
//                     <form>
//                         <div className="field">
//                             <div className="control">
//                                 <input
//                                     onChange={handleChange}
//                                     name="fullName"
//                                     defaultValue={res.displayName}
//                                     className="input"
//                                     type="text"
//                                     placeholder="ชื่อ-นามสกุล" />
//                             </div>
//                         </div>
//                         <div className="field">
//                             <div className="control">
//                                 <input
//                                     onChange={handleChange}
//                                     name="email"
//                                     defaultValue={res.email}
//                                     className="input"
//                                     type="text"
//                                     placeholder="อีเมลล์" />
//                             </div>
//                         </div>
//                         <div className="field">
//                             <div className="control">
//                                 <input
//                                     onChange={handleChange}
//                                     name="avatar"
//                                     className="input"
//                                     type="text"
//                                     placeholder="รูปประจำตัว" />
//                             </div>
//                         </div>

//                         <div className="field">
//                             <label className="label">คุณต้องการสมัครสมาชิกในฐานะ : </label>
//                             <label className="radio">
//                                 <input 
//                                 type="radio" 
//                                 name="signupAs" 
//                                 value="employee" 
//                                 onChange={handleOptionChange} 
//                                 checked={userProfile.signupAs === 'employee'} />
//                   นักศึกษา
//               </label>
//                             <label className="radio">
//                                 <input 
//                                 type="radio" 
//                                 name="signupAs" 
//                                 value="owner" 
//                                 onChange={handleOptionChange} 
//                                 checked={userProfile.signupAs === 'owner'} />
//                   ผู้ประกอบการ
//               </label>
//                         </div>

//                         {/* create button */}
//                         < div className="field is-grouped" >
//                             <div className="control">
//                                 <button
//                                     onClick={handleSubmit}
//                                     type="button"
//                                     className="button is-success">สมัครสมาชิก</button>
//                             </div>
//                             <div className="control">
//                                 <button className="button is-text">ยกเลิก</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RegisterForm