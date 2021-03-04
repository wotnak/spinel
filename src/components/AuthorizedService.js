import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const AuthorizedService = () => {
  const {baer, dhollandia, dautel} = useStaticQuery(graphql`
    query {
      baer: file(relativePath: { eq: "baer.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, formats: [AUTO, WEBP, AVIF], width: 119, height: 58, placeholder: TRACED_SVG)
        }
      }
      dhollandia: file(relativePath: { eq: "dhollandia.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, formats: [AUTO, WEBP, AVIF], width: 150, height: 58, placeholder: TRACED_SVG)
        }
      }
      dautel: file(relativePath: { eq: "dautel.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, formats: [AUTO, WEBP, AVIF], width: 150, height: 55, placeholder: TRACED_SVG)
        }
      }
    }
  `)
  return (
    <div className="has-text-align-center authorized-service">
      <h2 className="special">Jesteśmy autoryzowanym serwisem firm</h2>
      <GatsbyImage image={baer.childImageSharp.gatsbyImageData} alt="Baer Cargolift" />
      <GatsbyImage image={dhollandia.childImageSharp.gatsbyImageData} alt="Dhollandia" />
      <GatsbyImage image={dautel.childImageSharp.gatsbyImageData} alt="Dautel" />
    </div>
  )
}

export default AuthorizedService
