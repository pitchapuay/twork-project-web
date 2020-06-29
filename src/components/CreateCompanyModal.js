import React, { useState } from 'react'

const CreateCompanyModal = props => {

    const [isActive, setIsActive] = useState(false)

    const changeModalState = modalState => setIsActive(modalState)

    return (
        <div>
            <button
                onClick={() => changeModalState(true)}
                type="button"
                className="button is-medium is-info is-outlined"
                data-toggle="modal"
                data-target="#exampleModal">
                {props.openButtonText || 'Open'}
            </button>
            <div className={`modal ${isActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">

                    <header className="modal-card-head">
                        <p className="modal-card-title">ตรวจสอบข้อมูลก่อนยืนยันการลงประกาศ</p>
                        <button
                            onClick={() =>
                                changeModalState(false)
                            }
                            className="delete" aria-label="close"></button>
                    </header>

                    <section className="modal-card-body">
                        {props.children}
                    </section>

                    <footer className="modal-card-foot">
                        <button
                            onClick={() => props.onModalSubmit(() => changeModalState(false))}
                            className="button is-success">ลงประกาศ</button>
                        <button
                            onClick={() => changeModalState(false)}
                            className="button">ยกเลิก</button>
                    </footer>

                </div>
            </div>
        </div>
    )
}


export default CreateCompanyModal