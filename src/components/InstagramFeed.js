import React, { Component } from 'react'
// import 'isomorphic-fetch'
// import 'whatwg-fetch'

import Image from '../components/Image'
import './InstagramFeed.css'

export default class InstagramFeed extends Component {
  static defaultProps = {
    instagramUrl: 'https://instagram.com/instagram',
    count: 7
  }

  state = {
    mounted: false,
    posts: [],
    instagramUsername: ''
  }

  componentDidMount() {
    const parsed = this.parseInstagramUrl(this.props.instagramUrl)
    const instagramUsername = parsed ? parsed[1] : ''

    if (!this.state.mounted && instagramUsername) {
      this.fetchInstagram(instagramUsername)
      this.setState({
        mounted: true,
        instagramUsername
      })
    }
  }

  parseInstagramUrl = string =>
    string.match(/(?:https?:\/\/)(?:www.)?instagram.com\/([\w\d_-]+)\/?/i)

  fetchInstagram = instagramUsername => {
    typeof window !== 'undefined' &&
      window
        .fetch(`https://instagram.thrivex.io/?ref=thrivegoldcoast`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            posts: data && data.items ? data.items : []
          })
        })
        .catch(err => console.error(err))
  }

  renderLoadingItems = () => (
    <div className="InstagramFeed">
      {[...Array(this.props.count)].map((x, index) => (
        <div
          className="InstagramFeed--EmptyPost"
          data-display="Loading"
          key={`EmptyPost-${index}`}
        />
      ))}
    </div>
  )

  render() {
    if (!this.state.posts.length) {
      return this.renderLoadingItems()
    }
    return (
      <div className="InstagramFeed">
        {this.state.posts.slice(0, this.props.count).map(post => (
          <Post
            key={post.code}
            src={post.display_src}
            code={post.code}
            caption={post.caption}
          />
        ))}
      </div>
    )
  }
}

const Post = ({ src, code, caption }) => (
  <a
    className="InstagramFeed--EmptyPost InstagramFeed--EmptyPost-loaded"
    href={`https://instagram.com/p/${code}`}
    rel="noopener noreferrer"
    target="_blank"
    aria-label="Instagram Post Link"
  >
    <Image background src={src} lazy alt="instagram image" />
  </a>
)
