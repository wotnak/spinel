import { StaticQuery, Link, graphql } from "gatsby"
import React from "react"

const MenuLevel = ({ items }) => (
  <ul>
    { items.map( item => (
      <li>
        <Link to={item.url.replace('https://spinel.pl','')}>{item.title}</Link>
        { item.children ? <MenuLevel items={item.children} /> : null }
      </li>
    ) ) }
  </ul>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        menu: wordpressWpApiMenusMenusItems(slug: {eq: "menu-glowne"}) {
          items {
            order
            title
            url
            children: wordpress_children {
              title
              url
            }
          }
        }
      }
    `}
    render={data => (
      <nav className="site-menu">
        <button>Menu</button>
        <MenuLevel items={data.menu.items} {...props} />
      </nav>
    )}
  />
)
