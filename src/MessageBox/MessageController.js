import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, ModalFooter } from 'reactstrap'

export default class MessageController extends PureComponent {

  static propTypes = {
    addMessage: PropTypes.func.isRequired
  }

  state = {
    newMsg: ''
  }

  componentWillUnmount() {
    this.setState({ newMsg: '' })
  }

  onChange = ({ target: { value }}) => this.setState({ newMsg: value })

  onKeyDown = event => {
    if (event.keyCode === 13) {
      this.addNewMessage()
    }
  }

  addNewMessage = async () => {
    if (this.state.newMsg === '') {
      return
    }

    await this.props.addMessage(this.state.newMsg)
    this.setState({ newMsg: '' })
  }

  render() {
    const { newMsg } = this.state

    return (
      <ModalFooter>
        <section className="w-100 d-flex">
          <Input
            autoFocus={true}
            maxlength={1000}
            placeholder="Enter message"
            value={newMsg}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
          <Button
            color="primary"
            className="rounded ml-3"
            disabled={newMsg.length === 0}
            onClick={this.addNewMessage}
          >
            <i className="fa fa-paper-plane" /> Send
          </Button>
        </section>
      </ModalFooter>
    )
  }
}
