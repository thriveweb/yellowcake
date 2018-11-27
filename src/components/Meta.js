import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

const Meta = props => {
  const {
    title,
    url,
    description,
    absoluteImageUrl,
    twitterSiteAccount,
    twitterCreatorAccount,
    headerScripts,
    noindex,
    canonicalLink,
    siteTitle,
    siteUrl,
    siteDescription
    // overwrite { title, description } if in fields or fields.meta
  } = {
    ...props
  }

  // write headerScripts
  if (typeof window !== 'undefined') {
    const headerScriptsElement = document.head.querySelector('#headerScripts')
    if (headerScripts && headerScriptsElement) {
      headerScriptsElement.outerHTML = headerScripts
    }
  }

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:type" content="website" />}
      {url && <meta property="og:url" content={url} />}
      {absoluteImageUrl && (
        <meta name="twitter:card" content="summary_large_image" />
      )}
      {absoluteImageUrl && (
        <meta property="og:image" content={absoluteImageUrl} />
      )}
      {twitterSiteAccount && (
        <meta name="twitter:site" content={twitterSiteAccount} />
      )}
      {twitterCreatorAccount && (
        <meta name="twitter:creator" content={twitterCreatorAccount} />
      )}
      {noindex && <meta name="robots" content="noindex" />}
      {canonicalLink && <link rel="canonical" href={canonicalLink} />}

      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image:secure_url" content={siteUrl} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:title" content={siteTitle} />

      {absoluteImageUrl && (
        <meta name="twitter:image" content={absoluteImageUrl} />
      )}
    </Helmet>
  )
}

export default Meta

export const query = graphql`
  fragment Meta on MarkdownRemark {
    frontmatter {
      meta {
        title
        description
        noindex
        canonicalLink
      }
    }
  }
`
