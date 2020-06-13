import React from "react"

import "reset-css"
import "./layout.scss"

import Menu from "./Menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"

const TopBar = props => {
  return (
    <div className="topbar container">
      <div className="info">
        <div className="hours">
          <FontAwesomeIcon icon={faClock} height="12" width="12" /> pon-pt 7:00 - 15:00
        </div>
        <div className="contact">
          <a href="mailto:biuro@spinel.pl" className="email">
            <FontAwesomeIcon icon={faEnvelope} height="12" width="12" /> biuro@spinel.pl
          </a>
          <a href="tel:774643344" className="phone">
            <FontAwesomeIcon icon={faPhone} height="12" width="12" /> 77 464 33 44
          </a>
        </div>
      </div>
      <Menu {...props} />
    </div>
  )
}

export default TopBar
