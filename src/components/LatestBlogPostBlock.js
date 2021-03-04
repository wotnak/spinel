import { useStaticQuery, Link, graphql } from "gatsby"
import React from "react"

const LatestBlogPostBlock = () => {
  const {latestPost} = useStaticQuery(graphql`
      query {
        latestPost: wpPost(status: { eq: "publish" }) {
          title
          slug
          date(difference: "now")
        }
      }
  `)
  if (latestPost.date/1000/60/60/24/30 > 1) return (<></>)
  const url = `/blog/${latestPost.slug}`
  return (
    <aside className="block--latest-post">
      Ostatnio na blogu: <Link to={url}>{latestPost.title}</Link>
    </aside>
  )
}

export default LatestBlogPostBlock
