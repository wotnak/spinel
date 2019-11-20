import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Header from "../components/Header"
import { Helmet } from "react-helmet"

const PostTemplate = props => {
  const post = props.data.wordpressPost
  return (
    <Layout {...props}>
      <Helmet>
        <title>{post.title} | Spinel Hydraulika-Pneumatyka</title>
      </Helmet>
      <Header siteTitle={post.title} isFrontPage={false} />
      <Link to="/blog/" className="back-to-blog">
        ← Wróć na blog
      </Link>
      <main dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
    }
  }
`
