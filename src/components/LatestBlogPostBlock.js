import { useStaticQuery, Link, graphql } from "gatsby"
import React from "react"

export default () => {
  const {latestPost} = useStaticQuery(graphql`
      query {
        latestPost: wordpressPost(status: { eq: "publish" }) {
          title
          path
        }
      }
  `)
  return (
    <aside className="block--latest-post">
      Ostatnio na blogu: <Link to={latestPost.path}>{latestPost.title}</Link>
    </aside>
  )
}
