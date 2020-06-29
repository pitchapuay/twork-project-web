/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import { Link } from 'react-router-dom'

const RecievedOfferItem = ({ user, children, className }) => {

   return (
      <div
         className="column is-one-third">
         <div
            className={`feature-card is-bordered has-text-centered revealOnScroll delay-1 ${className}`}
            data-animation="fadeInLeft">
            <div className="card-title">
               <h4>{user.fullName}</h4>
            </div>
            <div className="card-icon">
               <img src={user.avatar} alt="" />
            </div>
            <div className="card-text">
               <p>อายุ : {user.age}</p>
               <p>เบอร์โทร : {user.phone}</p>
               <p>E-mail : {user.email}</p>
            </div>
            <div className="card-action">
               <Link
                  to={`/profile/${user.uid}`}
                  className="button btn-align-md">ดูข้อมูลส่วนตัวทั้งหมด</Link>
            </div>
            {children &&
               <div className="card-text">
                  {children}
               </div>
            }

         </div>
      </div >
   )
}

export default RecievedOfferItem