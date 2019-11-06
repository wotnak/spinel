import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import "reset-css"
import "./layout.scss"

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
      <TopBar isFrontPage={isFrontPage} />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer class="footer">
        Copyright © {new Date().getFullYear()} <Link to="/">Spinel Hydraulika-Pneumatyka</Link>. Wszelkie prawa zastrzeżone. | <Link to="/dane-osobowe">RODO</Link>
      </footer>
    </div>
  )
}

export default Layout
