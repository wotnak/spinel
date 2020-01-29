import { StaticQuery, Link, graphql } from "gatsby"
import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import logo from "../../assets/logo-small.png"

const MenuLevel = ({ items }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <ul>
      {items.map((item, i) => {
        let url = item.url.replace("https://panel.spinel.pl", "")
        if (url.trim().length === 0) url = false
        return (
          <li
            key={i}
            className={`${expanded ? "expanded" : ""}${
              item.mobileOnly ? " mobileOnly" : ""
            }`}
          >
            {url !== false ? (
              <Link to={url} className="menu-item">
                {item.title}
              </Link>
            ) : (
              <button
                onClick={() => setExpanded(!expanded)}
                className="menu-item"
              >
                {item.title}
              </button>
            )}
            {item.children ? <MenuLevel items={item.children} /> : null}
          </li>
        )
      })}
    </ul>
  )
}

const Menu = ({ data, isFrontPage }) => {
  const [visible, setVisible] = useState(false)
  return (
    <nav className={`site-menu ${visible ? "visible" : ""}`}>
      <Link to="/" className="logo">
        <img src={logo} alt="Spinel Hydraulika-Pneumatyka s.c." />
      </Link>
      <button onClick={() => setVisible(!visible)}>
        <FontAwesomeIcon icon={faBars} /> Menu
      </button>
      <MenuLevel items={data.menu.items} />
    </nav>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        menu: wordpressWpApiMenusMenusItems(slug: { eq: "menu-glowne" }) {
          items {
            title
            url
            children: wordpress_children {
              object_id
              title
              url
            }
          }
        }
      }
    `}
    render={data => {
      if (data.menu.items[0].url !== "/") {
        data.menu.items.unshift({
          title: "Strona główna",
          url: "/",
          mobileOnly: true,
        })
      }
      return <Menu data={data} {...props} />
    }}
  />
)
