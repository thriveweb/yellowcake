import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
import './Accordion.css'

export default class Accordion extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  // use state to auto close but has issues mobile view. onClick={() => this.handleClick(index)}
  // state = {
  //   activeItem: null
  // }
  //
  // handleClick = index => {
  //   this.setState({
  //     activeItem: this.state.activeItem === index ? null : index
  //   })
  // }

  toggleAccordion(e) {
    e.target.classList.toggle('active')
  }

  handleKeyDown = ev => {
    if (ev.keyCode === 13 && !ev.target.classList.contains('active')) {
      // enter to open
      this.toggleAccordion(ev)
    } else if (ev.keyCode === 27 && ev.target.classList.contains('active')) {
      // escape to close
      this.toggleAccordion(ev)
    }
  }

  render() {
    const { items, className } = this.props
    return (
      <div className={`Accordion ${className}`}>
        {!!items &&
          items.map((item, index) => (
            <div
              className={`Accordion--item `}
              key={`accordion-item-${_kebabCase(item.title) + '-' + index}`}
              onClick={this.toggleAccordion.bind(this)}
              onKeyDown={this.handleKeyDown}
              tabIndex={0}
              aria-label="Toggle Accordion"
              role="button"
            >
              <h2 className="flex">
                <span>{item.title}</span>
                <ChevronDown />
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
          ))}
      </div>
    )
  }
}
