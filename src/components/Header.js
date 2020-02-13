import React from "react"
import { StaticQuery, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'

export default ({ siteTitle, isFrontPage }) => (
  <StaticQuery
    query={graphql`
      query {
        bg: file(relativePath: { eq: "headbg.png" }) {
          childImageSharp {
            fluid(maxWidth: 998) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
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
    }}
  />
)