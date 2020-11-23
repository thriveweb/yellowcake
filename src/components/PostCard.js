import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'

import matineeImg from '../../public/images/17-matinee/2014.jpg'

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    <div>
    {title === "Matinee" ? (<div className="PostCard--Image relative">
        <Image background src={matineeImg} alt={title} />
      </div>) : featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    
    {/* {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={matineeImg} alt={title} />
      </div>
      
    )} */}
    </div>
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {/* {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>} */}
    </div>
  </Link>
)

export default PostCard
