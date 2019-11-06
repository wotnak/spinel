import { StaticQuery, Link, graphql } from "gatsby"
import React, { useState }from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const MenuLevel = ({ items }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ul>
      { items.map( (item, i) => {
        let url = item.url.replace('https://spinel.pl','')
        if (url.trim().length === 0) url = false
        return (
          <li key={i} className={expanded ? 'expanded' : ''}>
            { url !== false ?
                <Link to={url}>{item.title}</Link>
              :
                <a onClick={() => setExpanded(!expanded)}>{item.title}</a>
            }
            { item.children ? <MenuLevel items={item.children} /> : null }
          </li>
        )
      })}
    </ul>
  )
}

const Menu = ({data}) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className={`site-menu ${visible ? 'visible' : ''}`}>
      <button onClick={() => setVisible(!visible)}><FontAwesomeIcon icon={faBars} /> Menu</button>
      <MenuLevel items={data.menu.items} />
    </nav>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        menu: wordpressWpApiMenusMenusItems(slug: {eq: "menu-glowne"}) {
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
    
    render={data => (<Menu data={data} {...props} />)}
  />
)
