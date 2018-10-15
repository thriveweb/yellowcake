import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'

const onlyTruthyValues = obj => _pickBy(obj, item => item)

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
    canonicalLink
    // overwrite { title, description } if in fields or fields.meta
  } = {
    ...props,
    ...onlyTruthyValues(_get(props, 'fields')),
    ...onlyTruthyValues(_get(props, 'fields.meta'))
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
    </Helmet>
  )
}

export default Meta
