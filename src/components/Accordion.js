import React from 'react'
import { ChevronUp, ChevronDown } from 'react-feather'

import './Accordion.css'

export default class Accordion extends React.Component {
  static defaultProps = {
    items: [],
    className: '',
  }

  state = {
    activeItem: null,
  }

  handleClick = index => {
    const activeItem = this.state.activeItem === index ? null : index
    this.setState({ activeItem })
  }

  render() {
    const { items, className } = this.props
    return (
      <div className={`Accordion ${className}`}>
        {items.map((item, index) => {
          const active = this.state.activeItem === index
          return (
            <div
              className={`Accordion--item ${active ? 'active' : ''}`}
              key={`accordion-item-${item.title + index}`}
            >
              <h2 className="flex" onClick={() => this.handleClick(index)}>
                <span>{item.title}</span>{' '}
                {active ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {active && (
                <div className="description">
                  {item.description} <br />
                  {item.link && (
                    <a href={item.link} className="button">
                      {item.linkTitle}
                    </a>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}
