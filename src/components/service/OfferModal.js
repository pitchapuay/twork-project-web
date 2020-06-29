import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Modal from '../Modal'
import ErrorModal from '../ErrorModal'
import { useToasts } from 'react-toast-notifications'
import { createRef, createOffer } from 'actions'
import Checkbox from './Checkbox'
import { addMyJob, sendMessage } from 'api'
import { newMessageToOwner } from 'helpers/offers'

const OfferModal = ({ company, auth }) => {

    const { addToast } = useToasts()
    const [redirect, setRedirect] = useState(false)
    const [offer, setOffer] = useState({
        fromUser: '',
        toUser: '',
        company: '',
        companyId: '',
        status: 'pending',
        worktime: []
    })

    const [checkedItems, setCheckedItems] = useState([])
    const [checkedValue, setCheckedValue] = useState([])

    useEffect(() => {
        setOffer({ ...offer, worktime: checkedValue })
    }, [checkedValue])

    // push worktime from db to array

    const worktimeArray = []
    const a = company.worktime
    for (var i = 0; i < a.length; i++) {
        worktimeArray.push(a[i])
    }

    var data = []
    worktimeArray.forEach((v, i) => {
        data = [...data, { "name": v, "key": i, "label": v }]
    })

    const checkboxes = []
    checkboxes.push(...data)

    function handleChangeCheckbox(e) {
        const item = e.target.name
        const isChecked = e.target.checked
        // console.log(item, isChecked)
        const prev = checkedItems[item]
        switch (prev) {
            case undefined: {
                setCheckedValue([...checkedValue, item])
                break
            }
            case true: {
                if (isChecked === false) {
                    checkedValue.splice(checkedValue.indexOf(item), 1)
                }
                break

            }
            case false: {
                if (isChecked === true) {
                    setCheckedValue([...checkedValue, item])
                }
                break
            }
            default: { }
        }
        setCheckedItems({
            ...checkedItems,
            [item]: isChecked
        })

    }

    function checkOffer() {
        var myOffers = auth.user.myOffers
        return (myOffers.length === 0 || !(myOffers.includes(company.id)))
    }

    const [errors, setErrors] = useState({
        checkedItems: ''
    })

    const validate = () => {

        let checkedItems = ""

        if (!checkedItems) {
            checkedItems = "กรุณาเลือกวันที่สามารถทำงานได้อย่างน้อยหนึ่งวัน"
        }

        if (checkedItems) {
            setErrors({ checkedItems })
            return false
        }
        return true
    }

    const handleSubmit = (closeModal) => {
        // let isValid = validate()
        // if (isValid) {
            const offerCopy = { ...offer }

            offerCopy.fromUser = createRef('profiles', auth.user.uid)
            offerCopy.toUser = createRef('profiles', company.user.id)
            offerCopy.company = createRef('services', company.id)
            offerCopy.companyId = company.id
            offerCopy.companyName = company.companyName
            offerCopy.image = company.image

            createOffer(offerCopy)
                .then(_ => {
                    closeModal()
                    setRedirect(true)
                    addToast('สมัครงานสำเร็จ', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
                }, (error) => {
                    console.log(error)
                })

            addMyJob(auth.user.uid, company.id)

            const offerLast = { ...offerCopy }
            offerLast.fromUser = auth.user
            offerLast.toUser = company.user
            offerLast.signupAs = auth.user.signupAs

            const message = newMessageToOwner(offerLast)
            // console.log(message)
            sendMessage(message)
        //     isValid = false
        // }
        // isValid = false
    }

    if (redirect) { return <Redirect to='/offers/sent' /> }

    // employee view
    return (
        <div>
            {checkOffer() && company.quantity > 0 &&
                < Modal
                    onModalSubmit={handleSubmit}
                    openButtonText="สมัครงาน" >

                    <legend>กรุณาเลือกวันที่สามารถเข้าทำงานได้</legend>
                    {
                        checkboxes.map(item => (
                            <div key={item.key}>
                                <label key={item.key}>
                                    <Checkbox
                                        name={item.name}
                                        checked={checkedItems[item.name]}
                                        onChange={handleChangeCheckbox} />
                                    {item.name}
                                </label>
                            </div>
                        ))
                    }

                </Modal >
            }
            {company.quantity === 0 &&
                <span className="tag is-danger is-light is-large">ร้านนี้ปิดรับสมัครแล้ว</span>
            }
            {auth.user.myOffers.includes(company.id) && company.quantity > 0 &&
                <ErrorModal openButtonText="สมัครงาน">

                    <p className="subtitle is-5">ท่านได้สมัครงานที่ {company.companyName} แล้ว ไม่สามารถสมัครงานซ้ำได้อีก</p>
                    <p>ดูประวัติการสมัครงานของท่าน
                        <a href="/offers/sent">คลิกที่นี่</a>
                    </p>
                </ErrorModal>
            }
        </div>
    )

}

export default OfferModal