import { useStaticQuery, Link, graphql } from "gatsby"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import logo from "../../assets/logo-small.png"

const MenuLevel = ({ items }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <ul>
      {items.map((item, i) => {
        let url = item.path.replace("https://panel.spinel.pl", "")
        if (url.trim().length === 0 || url.indexOf('nolink') !== -1) url = false
        return (
          <li
            key={i}
            className={`${expanded ? "expanded" : ""}${
              item.mobileOnly ? " mobileOnly" : ""
            }`}
          >
            {url !== false ? (
              <Link to={url} className="menu-item">
                {item.label}
              </Link>
            ) : (
              <button
                onClick={() => setExpanded(!expanded)}
                className="menu-item"
              >
                {item.label}
              </button>
            )}
            {(item.childItems && item.childItems.nodes.length) ? <MenuLevel items={item.childItems.nodes} /> : null}
          </li>
        )
      })}
    </ul>
  )
}

const Menu = ({ menuItems, isFrontPage }) => {
  const [visible, setVisible] = useState(false)
  return (
    <nav className={`site-menu ${visible ? "visible" : ""}`}>
      <Link to="/" className="logo">
        <img src={logo} alt="Spinel Hydraulika-Pneumatyka s.c." />
      </Link>
      <button onClick={() => setVisible(!visible)}>
        <FontAwesomeIcon icon={faBars} /> Menu
      </button>
      <MenuLevel items={menuItems} />
    </nav>
  )
}

const MenuWrapper = props => {
  const data = useStaticQuery(graphql`
    query {
      menu: wpMenu(slug: {eq: "menu-glowne"}) {
        menuItems {
          nodes {
            label
            path
            parentId
            childItems {
              nodes {
                label
                path
              }
            }
          }
        }
      }
    }
  `)
  const menuItems = data.menu.menuItems.nodes.filter(menuItem => menuItem.parentId === null)
  if (menuItems[0].url !== "/") {
    menuItems.unshift({
      label: "Strona główna",
      path: "/",
      mobileOnly: true,
    })
  }
  return (<Menu menuItems={menuItems} {...props} />)
}

export default MenuWrapper
