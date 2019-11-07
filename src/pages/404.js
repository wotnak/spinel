import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>404 | Spinel Hydraulika-Pneumatyka</title>
    </Helmet>
    <h1>Zawartość nie została znaleziona.</h1>
  </Layout>
)

export default NotFoundPage
