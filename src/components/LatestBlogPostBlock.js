import { StaticQuery, Link, graphql } from "gatsby"
import React from "react"

export default () => (
  <StaticQuery
    query={graphql`
      query {
        latestPost: wordpressPost(status: {eq: "publish"}) {
            title
            path
          }
      }
    `}
    render={({latestPost}) => (
      <aside className="block--latest-post">Ostatnio na blogu: <Link to={latestPost.path}>{latestPost.title}</Link></aside>
    )}
  />
)
