/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import { Link } from 'react-router-dom'

const SentOffersItem = ({ company, children, className }) => {

   const shortText = (text, maxLength = 50) => {
      if (!text) { return ' ' }
      if (text.length <= maxLength) { return text }

      return text.substr(0, maxLength) + '...'
   }

   return (
      <div
          className="column is-one-third">
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
            </div>
      </div>
   )
}

export default SentOffersItem