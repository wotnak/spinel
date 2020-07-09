import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Header from "../components/Header"
import LatestBlogPostBlock from "../components/LatestBlogPostBlock"
import ImportantInfoBlock from "../components/ImportantInfoBlock"
import { Helmet } from "react-helmet"

const PageTemplate = props => {
  const page = props.data.wpPage
  return (
    <Layout children={props.children} isFrontPage={page.isFrontPage}>
      <Helmet>
        <meta charSet="utf-8" />
        {page.isFrontPage ? (
          <title>Spinel Hydraulika-Pneumatyka</title>
        ) : (
          <title>{page.title.replace('<br>', '')} | Spinel Hydraulika-Pneumatyka</title>
        )}
      </Helmet>
      <Header siteTitle={page.title} isFrontPage={page.isFrontPage} />
      <ImportantInfoBlock />
      {props.path === "/" && <LatestBlogPostBlock />}
      <main dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      isFrontPage
    }
  }
`
