import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'
import GithubCorner from './GithubCorner'

export default ({ children, meta, title }) => {
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            headerScripts
            socialMediaCard {
              image
            }
          }
          allPosts: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "posts" } } }
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { siteTitle, siteUrl, socialMediaCard, headerScripts } =
          data.settingsYaml || {}

        const subNav = {
          posts: data.allPosts.hasOwnProperty('edges')
            ? data.allPosts.edges.map(post => {
                return { ...post.node.fields, ...post.node.frontmatter }
              })
            : false
        }
        console.log(subNav)
        return (
          <Fragment>
            <Helmet
              defaultTitle={siteTitle}
              titleTemplate={`%s | ${siteTitle}`}
            >
              {title}
              {/* Add font link tags here */}
            </Helmet>

            <Meta
              headerScripts={headerScripts}
              absoluteImageUrl={
                socialMediaCard &&
                socialMediaCard.image &&
                siteUrl + socialMediaCard.image
              }
              {...meta}
            />

            <GithubCorner url="https://github.com/thriveweb/yellowcake" />

            <Nav subNav={subNav} />

            <Fragment>{children}</Fragment>

            <Footer />
          </Fragment>
        )
      }}
    />
  )
}
