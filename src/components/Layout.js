import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import "reset-css"
import "./layout.scss"
import icon from "../../assets/icon.png"
import TopBar from './TopBar'

const Layout = ({ children, path }) => {
  const isFrontPage = path === '/'
  return (
    <div className={`container page${isFrontPage ? ' frontPage' : ''}`}>
      <Helmet>
      	<html lang="pl" />
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href={icon} sizes="16x16" />
      </Helmet>
      <TopBar isFrontPage={isFrontPage} />
      {children}
      <footer className="footer">
        Copyright © {new Date().getFullYear()} <Link to="/">Spinel Hydraulika-Pneumatyka</Link>. Wszelkie prawa zastrzeżone. | <Link to="/dane-osobowe">RODO</Link>
      </footer>
    </div>
  )
}

export default Layout
