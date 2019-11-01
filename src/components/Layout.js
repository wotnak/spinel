import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import "reset-css"
import "./layout.scss"

import Header from "./Header"
import TopBar from './TopBar'

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
      <TopBar />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer>
        Copyright © {new Date().getFullYear()} Spinel Hydraulika-Pneumatyka. Wszelkie prawa zastrzeżone. | <Link to="/dane-osobowe">RODO</Link>
      </footer>
    </div>
  )
}

export default Layout
