import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const {baer, dhollandia, dautel} = useStaticQuery(graphql`
    query {
      baer: file(relativePath: { eq: "baer.png" }) {
        childImageSharp {
          fixed(width: 119, height: 58) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
      dhollandia: file(relativePath: { eq: "dhollandia.png" }) {
        childImageSharp {
          fixed(width: 150, height: 58) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
      dautel: file(relativePath: { eq: "dautel.png" }) {
        childImageSharp {
          fixed(width: 150, height: 55) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <div className="has-text-align-center authorized-service">
      <h2 className="special">Jesteśmy autoryzowanym serwisem firm</h2>
      <Img fixed={baer.childImageSharp.fixed} alt="Baer Cargolift" />
      <Img fixed={dhollandia.childImageSharp.fixed} alt="Dhollandia" />
      <Img fixed={dautel.childImageSharp.fixed} alt="Dautel" />
    </div>
  )
}
