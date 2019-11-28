import React from "react"

const Header = ({ siteTitle, isFrontPage }) => (
  <header className={`header${isFrontPage ? " header--home-page" : ""}`}>
    <h1 dangerouslySetInnerHTML={{ __html: siteTitle.replace('|', '<br/>') }} />
    {isFrontPage && (
      <p>
        Jesteśmy polską firmą rodzinną, działamy nieprzerwanie od 1988 roku.
        <br />
        Zajmujemy się kompleksowo hydrauliką siłową i pneumatyką.
      </p>
    )}
  </header>
)

export default Header
