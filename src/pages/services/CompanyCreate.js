import React, { useState, useEffect } from 'react'
import { createCompany } from 'actions'
import { Redirect } from 'react-router-dom'
import withOwner from 'components/hoc/withOwner'
import { storage } from 'db'

const CompanyCreate = ({ auth }) => {

    const [redirect, setRedirect] = useState(false)

    const [serviceForm, setServiceForm] = useState({
        category: 'ร้านอาหาร',
        companyName: '',
        description: '',
        image: '',
        map: '',
        position: '',
        qualification: '',
        salary: '',
        quantity: '',
        worktime: []
    })

    const [picName, setPicName] = useState('')

    const defaultWtState = {
        date: 'จันทร์',
        startHr: '00',
        startMin: '00',
        endHr: '00',
        endMin: '00'
    }


    const [wtState, setWtState] = useState(defaultWtState)

    const [w, setW] = useState([])

    const [blankWorktimeState, setBlankWorktimeState] = useState([{}])

    const hr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

    const minute = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
        '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
        '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
        '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']

    const [errors, setErrors] = useState({
        companyName: '',
        description: '',
        image: '',
        map: '',
        position: '',
        qualification: '',
        salary: '',
        quantity: ''
    })

    const validate = () => {

        let companyName = ""
        let description = ""
        let map = ""
        let position = ""
        let qualification = ""
        let salary = ""
        let quantity = ""
        let image = ""

        if (!serviceForm.companyName) {
            companyName = "กรุณากรอกชื่อร้าน/สถานประกอบการ"
        }

        if (serviceForm.companyName && serviceForm.companyName.length <= 5) {
            companyName = "ชื่อร้าน/สถานประกอบการควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"
        }

        if (!serviceForm.description) {
            description = "กรุณากรอกรายละเอียดร้าน"
        }

        if (serviceForm.description && serviceForm.description.length <= 10) {
            description = "รายละเอียดร้านควรมีความยาวไม่ต่ำกว่า 10 ตัวอักษร"
        }

        if (!serviceForm.map) {
            map = "กรุณากรอกแผนที่ตั้งร้าน"
        }

        if (serviceForm.map && serviceForm.map.length <= 10) {
            map = "แผนที่ตั้งร้านควรมีความยาวไม่ต่ำกว่า 10 ตัวอักษร"
        }

        if (!serviceForm.position) {
            position = "กรุณากรอกตำแหน่งว่าง"
        }

        if (serviceForm.position && serviceForm.position.length <= 5) {
            position = "ตำแหน่งว่างควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"
        }

        if (!serviceForm.qualification) {
            qualification = "กรุณากรอกคุณสมบัติ"
        }

        if (serviceForm.qualification && serviceForm.companyName.length <= 5) {
            qualification = "คุณสมบัติควรมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"
        }

        if (!serviceForm.salary) {
            salary = "กรุณากรอกค่าจ้าง"
        }

        if (!serviceForm.quantity) {
            quantity = "กรุณากรอกจำนวนตำแหน่งว่าง"
        }

        if (!serviceForm.image) {
            image = "กรุณาเลือกรูปภาพ"
        }

        if (companyName || description || map || position || image
            || qualification || salary || quantity) {
            setErrors({ companyName, description, map, image, position, qualification, salary, quantity })
            return false
        }
        return true
    }


    const addWorktime = () => {
        var string = wtState.date.concat(" ", wtState.startHr, ".", wtState.startMin, "-", wtState.endHr, ".", wtState.endMin, " น.")
        // console.log(string)
        setW([...w, string])
        setBlankWorktimeState([...blankWorktimeState, {}])
        setWtState(defaultWtState)
    }

    const handleWorktime = e => {
        const { name, value } = e.target
        setWtState({ ...wtState, [name]: value })
    }

    const handleChange = e => {
        const { name, value } = e.target
        setServiceForm({ ...serviceForm, [name]: value })
    }

    function handleImage(event) {
        let file = event.target.files[0]
        setPicName(file.name)
        var metadata = {
            contentType: 'image/jpg',
        }
        var uploadTask = storage.ref(`/Services/${file.name}`).put(file, metadata)
        uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('Services').child(file.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setServiceForm({ ...serviceForm, image: fireBaseUrl })
                    })
            })
    }

    const handleSubmit = () => {
        let isValid = validate()
        if (isValid) {
            const { user } = auth
            createCompany(serviceForm, user.uid, wtState)
                .then(() => setRedirect(true))
                .catch(error => {
                    console.log(error)
                })
            isValid = false
        }
        isValid = false
    }

    useEffect(() => {
        setServiceForm({ ...serviceForm, worktime: w })
    }, [w, wtState])

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <div className="create-page">
            <div className="container">
                <div className="form-container">
                    <div className="columns is-vcentered">
                        <div className="column is-one-fifth">
                            <h1 className="title">ลงประกาศ</h1>
                        </div>
                        <div className="column">
                            <span className="tag is-normal is-info is-light is-rounded">สำหรับผู้ประกอบการ</span>
                        </div>
                    </div>

                    <form>
                        <div className="field">
                            <label className="label">ประเภทร้าน</label>
                            <div className="control">
                                <div className="select">
                                    <select name="category" onChange={handleChange}>
                                        <option value="ร้านอาหาร">ร้านอาหาร</option>
                                        <option value="คาเฟ่/ร้านกาแฟ/เบเกอรี่">คาเฟ่/ร้านกาแฟ/เบเกอรี่</option>
                                        <option value="ร้านจำหน่ายอุปกรณ์การเรียน">ร้านจำหน่ายอุปกรณ์การเรียน</option>
                                        <option value="ร้านซ่อมรถ">ร้านซ่อมรถ</option>
                                        <option value="สถาบันกวดวิชา">สถาบันกวดวิชา</option>
                                        <option value="ร้านทำผม">ร้านทำผม</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">ชื่อร้าน/สถานประกอบการ</label>
                            <div className="control">
                                <input
                                    onChange={handleChange}
                                    name="companyName"
                                    className={`input ${errors.companyName && 'is-danger'}`}
                                    type="text"
                                    placeholder="ชื่อร้าน/สถานประกอบการ"
                                    required />
                                {errors.companyName && (
                                    <p className="help is-danger">{errors.companyName}</p>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">รายละเอียดร้าน</label>
                            <div className="control">
                                <textarea
                                    onChange={handleChange}
                                    name="description"
                                    className={`textarea ${errors.description && 'is-danger'}`}
                                    placeholder="รายละเอียดร้าน"
                                    required
                                ></textarea>
                                {errors.description && (
                                    <p className="help is-danger">{errors.description}</p>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">รูปภาพ</label>
                            <div className="control">

                                <label className="file-label">
                                    <input
                                        onChange={handleImage}
                                        name="image"
                                        className="file-input"
                                        type="file"
                                        required
                                    />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">เลือกไฟล์เพื่อเพิ่มรูปภาพ</span>
                                    </span>
                                    {serviceForm.image === '' &&
                                        <span className="file-name">No file uploaded.</span>
                                    }
                                    {serviceForm.image !== '' &&
                                        <span className="file-name">{picName}</span>
                                    }

                                </label>
                                {errors.image && (
                                    <p className="help is-danger">{errors.image}</p>
                                )}

                            </div>
                        </div>
                        <div className="field">
                            <label className="label">แผนที่ตั้งร้าน</label>
                            <div className="control">
                                <input
                                    onChange={handleChange}
                                    name="map"
                                    className={`input ${errors.map && 'is-danger'}`}
                                    type="text"
                                    placeholder="แผนที่ตั้งร้าน" />
                            </div>
                            {errors.map && (
                                <p className="help is-danger">{errors.map}</p>
                            )}
                        </div>
                        <div className="field">
                            <label className="label">ตำแหน่งว่าง</label>
                            <div className="control">
                                <input
                                    onChange={handleChange}
                                    name="position"
                                    className={`input ${errors.position && 'is-danger'}`}
                                    type="text"
                                    placeholder="ตำแหน่งว่าง" />
                                {errors.position && (
                                    <p className="help is-danger">{errors.position}</p>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">คุณสมบัติ</label>
                            <div className="control">
                                <textarea
                                    onChange={handleChange}
                                    name="qualification"
                                    className={`textarea ${errors.qualification && 'is-danger'}`}
                                    placeholder="คุณสมบัติ"></textarea>
                                {errors.qualification && (
                                    <p className="help is-danger">{errors.qualification}</p>
                                )}
                            </div>
                        </div>

                        {/* worktime dynamic control input */}
                        <div className="field">
                            <label className="label">เวลาทำงาน</label>
                            {blankWorktimeState.map((v, i) => (
                                <div key={i}>
                                    <table className="table center-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="control">
                                                        <div className="select">
                                                            <select name="date" onChange={handleWorktime}>
                                                                <option value="จันทร์">จันทร์</option>
                                                                <option value="อังคาร">อังคาร</option>
                                                                <option value="พุธ">พุธ</option>
                                                                <option value="พฤหัสบดี">พฤหัสบดี</option>
                                                                <option value="ศุกร์">ศุกร์</option>
                                                                <option value="เสาร์">เสาร์</option>
                                                                <option value="อาทิตย์">อาทิตย์</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>เวลา</p>
                                                </td>
                                                <td>
                                                    <div className="control">
                                                        <div className="select">
                                                            <select name="startHr" onChange={handleWorktime}>
                                                                {hr.map(item => (
                                                                    <option key={item} value={item}>{item}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>:</p>
                                                </td>
                                                <td>
                                                    <div className="select">
                                                        <select name="startMin" onChange={handleWorktime}>
                                                            {minute.map(item => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>ถึง</p>
                                                </td>
                                                <td>
                                                    <div className="select">
                                                        <select name="endHr" onChange={handleWorktime}>
                                                            {hr.map(item => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>:</p>
                                                </td>
                                                <td>
                                                    <div className="select">
                                                        <select name="endMin" onChange={handleWorktime}>
                                                            {minute.map(item => (
                                                                <option key={item} value={item}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}

                            <input
                                type="button"
                                value="เพิ่มเวลาทำงาน"
                                className="button accent-btn is-link"
                                onClick={addWorktime} />
                        </div>

                        <div className="field">
                            <label className="label">ค่าจ้าง</label>
                            <div className="control">
                                <input
                                    onChange={handleChange}
                                    name="salary"
                                    className={`input ${errors.salary && 'is-danger'}`}
                                    type="number"
                                    placeholder="ใส่เฉพาะตัวเลข" />
                                {errors.salary && (
                                    <p className="help is-danger">{errors.salary}</p>
                                )}
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">จำนวนตำแหน่งว่าง</label>
                            <div className="control">
                                <input
                                    onChange={handleChange}
                                    name="quantity"
                                    className={`input ${errors.quantity && 'is-danger'}`}
                                    type="number"
                                    placeholder="ใส่เฉพาะตัวเลข" />
                                {errors.quantity && (
                                    <p className="help is-danger">{errors.quantity}</p>
                                )}
                            </div>
                        </div>

                        {/* create button */}
                        < div className="field is-grouped" >
                            <div className="control">
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="button is-success">ลงประกาศ</button>
                            </div>
                            <div className="control">
                                <button className="button is-danger">ยกเลิก</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default withOwner(CompanyCreate)