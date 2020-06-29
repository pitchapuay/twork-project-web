/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { clearServiceQuantity, clearEmployee } from 'api'

const MyCompanyItem = ({ company, children, className, noButton }) => {

   const [closeEmploy, setCloseEmploy] = useState(false)

   const setServiceQuantityToZero = companyId => {
      clearServiceQuantity(companyId)
      clearEmployee(companyId)
      setCloseEmploy(true)
   }

   return (
      <div
         className="column is-one-third">
         <div
            className={`feature-card-recieved-offers is-bordered has-text-centered revealOnScroll delay-1 ${className}`}
            data-animation="fadeInLeft">
            <div className="card-title">
               <h4>{company.companyName}</h4>
            </div>
            <div className="card-icon">
               <img src={company.image} alt="" />
            </div>
            {company.quantity > 0 && !closeEmploy &&
               <div className="card-text">
                  <p>ตำแหน่งว่าง : {company.quantity} อัตรา</p>
               </div>
            }
            {company.quantity === 0 && !closeEmploy &&
               <div className="card-text">
                  <p className="has-text-danger">ปิดการรับสมัครแล้ว</p>
               </div>
            }
            {closeEmploy &&
               <div className="card-text">
                  <p className="has-text-danger">ปิดการรับสมัครแล้ว</p>
               </div>
            }

            {children &&
               <div className="card-text">
                  {children}
               </div>
            }
            {!noButton &&
            <div>
               <div className="card-action">
                  <Link
                     to={`/services/${company.id}`}
                     className="button btn-align-md accent-btn raised">ดูรายละเอียด</Link>
               </div>
               <div className="card-action">
                  <Link
                     to={`/offers/recieved/${company.id}`}
                     className="button btn-align-md accent-btn raised">ดูผู้ที่สมัครงาน</Link>
               </div>
               <div className="card-action">
                  {company.quantity === 0 && 
                  <button
                     disabled
                     className="button btn-align-md danger-btn raised">ปิดรับสมัคร</button>
                  }
                  {company.quantity > 0 &&
                  <button
                     onClick={() => setServiceQuantityToZero(company.id)}
                     className="button btn-align-md danger-btn raised">ปิดรับสมัคร</button>
                  }
               </div>
               </div>
            }
         </div>
      </div>
   )
}

export default MyCompanyItem