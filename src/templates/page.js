import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/Layout'

const PageTemplate = (props) => {
  const page = props.data.wordpressPage
  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  )
}


export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`