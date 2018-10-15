import React, { Component } from 'react'
import { stringify } from 'qs'

import './Form.css'
import './FormControlled.css'

const fetch = window.fetch

class Form extends Component {
  static defaultProps = {
    name: 'Controlled Form'
  }

  initialState = {
    name: '',
    email: '',
    message: '',
    subject: `New Submission from ${this.props.siteTitle}!`,
    _gotcha: '',
    disabled: false,
    alert: '',
    action: '/contact/',
    'form-name': this.props.name
  }

  state = {
    ...this.initialState
  }

  form = null
  inputs = []

  componentDidMount () {
    if (!this.form) return
    this.inputs = [...this.form.querySelectorAll('input, textarea')]
    this.addListeners()
  }

  addListeners = () => {
    this.inputs.forEach(input => {
      input.addEventListener('invalid', () => {
        input.dataset.touched = true
      })
      input.addEventListener('blur', () => {
        if (input.value !== '') input.dataset.touched = true
      })
    })
  }

  resetForm = customState => {
    this.setState({ ...this.initialState, ...customState })
    this.inputs.forEach(input => {
      delete input.dataset.touched
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      subject: this.state.subject,
      _gotcha: this.state._gotcha,
      'form-name': this.state['form-name']
    }
    this.setState({ disabled: true })
    fetch(this.state.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(
        this.resetForm({
          alert: 'Thanks for your enquiry, we will get back to you soon.'
        })
      )
      .catch(err => {
        console.log(err)
        this.setState({
          disabled: false,
          alert:
            '❗️ There is a problem, your message has not been sent, please try contacting us via email'
        })
      })
  }

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  render () {
    return (
      <form
        className='Form Form-controlled'
        name={this.state['form-name']}
        ref={form => {
          this.form = form
        }}
        action={this.state.action}
        onSubmit={this.handleSubmit}
        data-netlify=''
        data-netlify-honeypot='_gotcha'
      >
        {this.state.alert && (
          <div className='Form--Alert'>{this.state.alert}</div>
        )}
        <label className='Form--Label'>
          <input
            className='Form--Input'
            value={this.state.name}
            onChange={this.handleChange}
            type='text'
            placeholder='Your Name'
            name='name'
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
          <LineGroup />
        </label>
        <label className='Form--Label'>
          <input
            className='Form--Input'
            value={this.state.email}
            onChange={this.handleChange}
            type='email'
            placeholder='Your Email'
            name='email'
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
          <LineGroup />
        </label>
        <label className='Form--Label'>
          <textarea
            className='Form--Input Form--Textarea'
            value={this.state.message}
            onChange={this.handleChange}
            placeholder='Message'
            name='message'
            rows='10'
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
          <LineGroup />
        </label>
        <input
          className='Form--Input'
          type='text'
          name='_gotcha'
          style={{ display: 'none' }}
          value={this.state._gotcha}
          onChange={this.handleChange}
        />
        <input
          className='Form--Input'
          type='hidden'
          name='subject'
          value={this.state.subject}
        />
        <input
          className='Form--Input'
          type='hidden'
          name='form-name'
          value={this.state['form-name']}
        />
        <button
          className='Button Form--SubmitButton'
          type='submit'
          value='Send'
          disabled={this.state.disabled ? 'disabled' : ''}
        >
          Enquire
        </button>
      </form>
    )
  }
}

const LineGroup = () => (
  <svg
    className='Form--Line'
    viewBox='0 0 40 2'
    preserveAspectRatio='none'
  >
    <path d='M0 1 L40 1' />
    <path d='M0 1 L40 1' className='focus' />
    <path d='M0 1 L40 1' className='invalid' />
    <path d='M0 1 L40 1' className='valid' />
  </svg>
)

export default Form
