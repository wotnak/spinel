import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Header from "../components/Header"
import LatestBlogPostBlock from "../components/LatestBlogPostBlock"
import { Helmet } from "react-helmet"

const PageTemplate = props => {
  const page = props.data.wordpressPage
  const isFrontPage = page.path === "/"
  return (
    <Layout {...props}>
      <Helmet>
        <meta charSet="utf-8" />
        {isFrontPage ? (
          <title>Spinel Hydraulika-Pneumatyka</title>
        ) : (
          <title>{page.title.replace('<br>', '')} | Spinel Hydraulika-Pneumatyka</title>
        )}
      </Helmet>
      <Header siteTitle={page.title} isFrontPage={isFrontPage} />
      {props.path === "/" && <LatestBlogPostBlock />}
      <main dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      path
    }
  }
`
