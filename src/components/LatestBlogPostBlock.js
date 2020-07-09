import { useStaticQuery, Link, graphql } from "gatsby"
import React from "react"

export default () => {
  const {latestPost} = useStaticQuery(graphql`
      query {
        latestPost: wpPost(status: { eq: "publish" }) {
          title
          uri
          date(difference: "now")
        }
      }
  `)
  if (latestPost.date/1000/60/60/24/30 > 1) return (<></>)
  return (
    <aside className="block--latest-post">
      Ostatnio na blogu: <Link to={latestPost.uri}>{latestPost.title}</Link>
    </aside>
  )
}
