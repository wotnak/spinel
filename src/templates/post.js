import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Header from "../components/Header"
import ImportantInfoBlock from "../components/ImportantInfoBlock"
import { Helmet } from "react-helmet"

const renderTableOfContentItems = (items) => {
  return (
    <ol>
      {items.map(({ url, title, items }) => (
        <li key={url}>
          <a href={url}>{title}</a>
          {items && items.length && renderTableOfContentItems(items)}
        </li>
      ))}
    </ol>
  )
}


const PostTemplate = props => {
  const post = props.data.wpPost
  return (
    <Layout {...props}>
      <Helmet>
        <title>{post.title.replace('<br>', '')} | Spinel Hydraulika-Pneumatyka</title>
      </Helmet>
      <Header siteTitle={post.title} isFrontPage={false} />
      <ImportantInfoBlock />
      <Link to="/blog/" className="back-to-blog">
        ← Wróć na blog
      </Link>
      {post.toc && post.toc.items && post.toc.items.length >= 2 && (
        <aside className="toc">
          <h2>Spis treści</h2>
          {renderTableOfContentItems(post.toc.items)}
        </aside>
      )}
      <main dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      toc
      content
    }
  }
`
