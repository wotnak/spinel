import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import "normalize.css"
import "./layout.scss"

import Header from "./header"
import Menu from './menu'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="container">
      <Header siteTitle={data.site.siteMetadata.title} />
      <Menu />
      <main>{children}</main>
      <footer>
        Copyright © {new Date().getFullYear()} Spinel Hydraulika-Pneumatyka. Wszelkie prawa zastrzeżone. | <Link to="/dane-osobowe">RODO</Link>
      </footer>
    </div>
  )
}

export default Layout
