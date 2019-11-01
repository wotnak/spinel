import React from "react"

import "reset-css"
import "./layout.scss"

import Menu from './Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

const TopBar = ({ children }) => {
  return (
    <div className="topbar container">
      <div className="info">
        <div className="hours"><FontAwesomeIcon icon={faClock} /> pon-pt 7:00 - 15:00</div>
        <div className="contact">
          <a href="mailto:biuro@spinel.pl" className="email"><FontAwesomeIcon icon={faEnvelope} /> biuro@spinel.pl</a>
          <a href="tel:774643344" className="phone"><FontAwesomeIcon icon={faPhone} /> 77 464 33 44</a>
        </div>
      </div>
      <Menu />
    </div>
  )
}

export default TopBar
