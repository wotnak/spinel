import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import "reset-css"
import "./layout.scss"
import icon from "../../assets/icon.png"
import Header from "./Header"
import TopBar from './TopBar'

const Layout = ({ children, path }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const isFrontPage = path === '/'

  return (
    <div className={`container page${isFrontPage ? ' frontPage' : ''}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href={icon} sizes="16x16" />
      </Helmet>
      <TopBar isFrontPage={isFrontPage} />
      {children}
      <footer class="footer">
        Copyright © {new Date().getFullYear()} <Link to="/">Spinel Hydraulika-Pneumatyka</Link>. Wszelkie prawa zastrzeżone. | <Link to="/dane-osobowe">RODO</Link>
      </footer>
    </div>
  )
}

export default Layout
