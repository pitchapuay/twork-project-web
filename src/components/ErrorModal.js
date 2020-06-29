import React, { useState } from 'react'

const Modal = props => {

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
                        <p className="modal-card-title">สมัครงานซ้ำ</p>
                        <button
                            onClick={() => changeModalState(false)}
                            className="delete" aria-label="close"></button>
                    </header>

                    <section className="modal-card-body">
                        {props.children}
                    </section>

                </div>
            </div>
        </div>
    )
}


export default Modal