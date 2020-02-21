import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'

export default ({ siteTitle, isFrontPage }) => {
  const data = useStaticQuery(graphql`
      query {
        bg: file(relativePath: { eq: "headbg.png" }) {
          childImageSharp {
            fluid(maxWidth: 998) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
  `)
  const imageData = data.bg.childImageSharp.fluid
  return (
    <BackgroundImage
      Tag="header"
      className={`header${isFrontPage ? " header--home-page" : ""}`}
      fluid={imageData}
    >
      <h1 dangerouslySetInnerHTML={{ __html: siteTitle.replace('|', '<br/>') }} />
      {isFrontPage && (
        <p>
          Jesteśmy polską firmą rodzinną, działamy nieprzerwanie od 1988 roku.
          <br />
          Zajmujemy się kompleksowo hydrauliką siłową i pneumatyką.
        </p>
      )}
    </BackgroundImage>
  )
}
