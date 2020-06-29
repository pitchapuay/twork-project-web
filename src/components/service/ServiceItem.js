/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import { Link } from 'react-router-dom'

const ServiceItem = ({ company, children, className, noButton }) => {

   const shortText = (text, maxLength = 50) => {
      if (!text) { return ' ' }
      if (text.length <= maxLength) { return text }

      return text.substr(0, maxLength) + '...'
   }

   return (
      <div
          className="column is-one-third">
         {company.quantity > 0 &&
            <div
               className={`feature-card is-bordered has-text-centered revealOnScroll delay-1 ${className}`}
               data-animation="fadeInLeft">
               <div className="card-title">
                  <h4>{company.companyName}</h4>
               </div>
               <div className="card-icon">
                  <img src={company.image} alt="" />
               </div>
               <div className="card-text">
                  <p>{shortText(company.description)}</p>
               </div>
               {children &&
                  <div className="card-text">
                     {children}
                  </div>
               }
               {!noButton &&
                  <div className="card-action">
                     <Link
                        to={`/services/${company.id}`}
                        className="button btn-align-md accent-btn raised">ดูรายละเอียด</Link>
                  </div>
               }
            </div>
         }
      </div>
   )
}

export default ServiceItem