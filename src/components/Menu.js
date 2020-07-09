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
        let url = item.url.replace("https://panel.spinel.pl", "")
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
            {item.children.length ? <MenuLevel items={item.children} /> : null}
          </li>
        )
      })}
    </ul>
  )
}

const Menu = ({ items, isFrontPage }) => {
  const [visible, setVisible] = useState(false)
  return (
    <nav className={`site-menu ${visible ? "visible" : ""}`}>
      <Link to="/" className="logo">
        <img src={logo} alt="Spinel Hydraulika-Pneumatyka s.c." />
      </Link>
      <button onClick={() => setVisible(!visible)}>
        <FontAwesomeIcon icon={faBars} /> Menu
      </button>
      <MenuLevel items={items} />
    </nav>
  )
}

export default props => {
  const data = useStaticQuery(graphql`
    query {
      allWpMenuItem(filter: {locations: {eq: PRIMARY}}) {
        nodes {
          key: id
          parentId
          title: label
          url
        }
      }
    }
  `)

  const items = flatListToHierarchical(data.allWpMenuItem.nodes)
  items.unshift({
    title: "Strona główna",
    url: "/",
    mobileOnly: true,
    children: [],
  })
  return (<Menu items={items} {...props} />)
}

const flatListToHierarchical = (
    data = [],
    {idKey='key',parentKey='parentId',childrenKey='children'} = {}
) => {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
        const newItem = {...item};
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId
            ? (
                childrenOf[parentId] = childrenOf[parentId] || []
            ).push(newItem)
            : tree.push(newItem);
    });
    return tree;
};