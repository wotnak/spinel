import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import Layout from '../components/Layout'

const Post = ({ post }) => (
  <article>
    <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
    <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
  </article>
)

const Blog = ({ posts }) => {
  return (
    <Layout>
      <h1>Blog firmowy</h1>
      {posts.map(post => (<Post post={post}/>))}
    </Layout>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPost {
          edges {
            node {
              id
              slug
              title
              excerpt
            }
          }
        }
      }
    `}
    render={data => <Blog posts={data.allWordpressPost.edges.map(edge => edge.node)} {...props} />}
  />
)