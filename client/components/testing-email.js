import React, {Component} from 'react'
import axios from 'axios'

const sendEmailMessage = async email => {
  const res = await axios.post('/api/email/send', email)
  if (res.status === 201) {
    return 'Sent!'
  } else {
    throw new Error('Email not sent.')
  }
}

export class TestingEmail extends Component {
  constructor() {
    super()
    this.state = {
      subject: '',
      message: '',
      recipient: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const newEmail = {
      subject: this.state.subject,
      message: this.state.message,
      recipient: String(this.state.recipient)
    }
    await sendEmailMessage(newEmail)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <span>
            Subject:
            <input
              type="text"
              label="Subject"
              value={this.state.subject || ''}
              onChange={evt => this.setState({subject: evt.target.value})}
            />
          </span>

          <span>
            Message:
            <input
              type="text"
              label="Message"
              value={this.state.message || ''}
              onChange={evt => this.setState({message: evt.target.value})}
            />
          </span>

          <span>
            Recipient:
            <input
              type="email"
              label="Recipient"
              value={this.state.recipient}
              onChange={evt => this.setState({recipient: evt.target.value})}
            />
          </span>
          <button type="submit">SEND</button>
        </form>
      </div>
    )
  }
}

export default TestingEmail
