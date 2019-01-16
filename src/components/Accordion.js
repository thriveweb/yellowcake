import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'

import './Accordion.css'

export default class Accordion extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  state = {
    activeItem: null
  }

  handleClick = index => {
    const activeItem = this.state.activeItem === index ? null : index
    this.setState({ activeItem })
  }

  render() {
    const { items, className } = this.props
    return (
      <div className={`Accordion ${className}`}>
        {!!items &&
          items.map((item, index) => {
            const active = this.state.activeItem === index
            return (
              <div
                className={`Accordion--item ${active ? 'active' : ''}`}
                key={`accordion-item-${item.title + index}`}
                onClick={() => this.handleClick(index)}
              >
                <h2 className="flex">
                  <span>{item.title}</span> <ChevronDown />
                </h2>
                <div className={'description'}>
                  {item.description} <br />
                  {item.link && (
                    <div href={item.link} className="button">
                      {item.linkTitle}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}
