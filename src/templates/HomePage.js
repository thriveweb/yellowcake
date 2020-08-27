import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import AlertTriangle from 'react-feather/dist/icons/alert-triangle'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, body }) => (
  <main className="Home">
    {/*}
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>*/}
    <Layout>
      <Helmet>
        <title>Site en cours de développement</title>
      </Helmet>
      <section className="section thick">
        <div className="container skinny taCenter">
          <p>
            <AlertTriangle size="5rem" />
          </p>
          <h1>Site en cours de développement</h1>
          <p>
            Le site sera disponible prochainement            
          </p>
        </div>
      </section>
    </Layout>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
