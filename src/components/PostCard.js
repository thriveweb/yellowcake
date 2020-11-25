import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'

import matineeImg from '../../public/images/17-matinee/2014.jpg'
import cosiImg from '../../static/images/17-cosi-fan-tutte/cosi-fan-tutte01.jpg'
import turandotImg from '../../static/images/18-turandot/turandot1.jpg'
import hangelImg from '../../static/images/18-hangel-gretel/2.jpg'
import mozartImg from '../../static/images/18-mozart-salieri/moz3.jpg'
import amahlImg from '../../static/images/18-amahl/amahl32.jpg'
import maidImg from '../../static/images/18-old-maid/maid1.jpg'
import wertherImg from '../../static/images/19-werther/werther1.jpg'
import gardenImg from '../../static/images/19-garden/garden1.jpg'
import magicImg from '../../static/images/19-magic-flute/magic1.jpg'
import giovanniImg from '../../static/images/19-giovanni/giovanni01.jpg'
import toscaImg from '../../static/images/20-tosca/tosca1.jpg'

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
      </div>) : 
      title === "Cosi Fan Tutte" ? (<div className="PostCard--Image relative">
      <Image background src={cosiImg} alt={title} />
    </div>)
      :
      title === "Hangel und Gretel" ? (<div className="PostCard--Image relative">
      <Image background src={hangelImg} alt={title} />
    </div>)
      :
      title === "Mozart & Salieri" ? (<div className="PostCard--Image relative">
      <Image background src={mozartImg} alt={title} />
    </div>)
      :
      title === "Amahl and the Night Visitors" ? (<div className="PostCard--Image relative">
      <Image background src={amahlImg} alt={title} />
    </div>)
      :
      title === "Turandot" ? (<div className="PostCard--Image relative">
      <Image background src={turandotImg} alt={title} />
    </div>)
      :
      title === "The Old Maid and the Theif" ? (<div className="PostCard--Image relative">
      <Image background src={maidImg} alt={title} />
    </div>)
      :
      title === "Werther" ? (<div className="PostCard--Image relative">
      <Image background src={wertherImg} alt={title} />
    </div>)
      :
      title === "Garden Killer" ? (<div className="PostCard--Image relative">
      <Image background src={gardenImg} alt={title} />
    </div>)
      :
      title === "Die Zauberflote (Magic Flute)" ? (<div className="PostCard--Image relative">
      <Image background src={magicImg} alt={title} />
    </div>)
      :
      title === "Don Giovanni" ? (<div className="PostCard--Image relative">
      <Image background src={giovanniImg} alt={title} />
    </div>)
      :
      title === "Tosca" ? (<div className="PostCard--Image relative">
      <Image background src={toscaImg} alt={title} />
    </div>)
      :
      featuredImage && (
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
