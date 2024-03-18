import {Component} from 'react'
import {message} from 'antd'
import Cookies from 'js-cookie'

import './index.css'

class Start extends Component {
  state = {username: '', showUserNameError: false, errorMsg: ''}

  getUserName = e => {
    this.setState({username: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    const {username} = this.state

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace(`/game/${username}`)
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username} = this.state

    if (username === '') {
      this.setState({
        showUserNameError: true,
        errorMsg: 'Enter Name Carefully!',
      })
    } else {
      const userDetails = {username}
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(
        'http://localhost:9000/login',
        requestOptions,
      )
      console.log(response)
      const data = await response.json()

      if (response.ok === true) {
        const config = {
          className: 'pop-messages',
          content: 'Entered Into The Game!',
        }
        setTimeout(() => {
          message.success(config)
        }, 1000)
        this.onSubmitSuccess(data.jwtToken)
      } else {
        const config = {
          className: 'pop-messages',
          content: 'Server Error!',
        }
        setTimeout(() => {
          message.error(config)
        }, 1000)
        this.setState({showUserNameError: true, errorMsg: 'Server Error!'})
      }
    }
  }

  render() {
    const {username, showUserNameError, errorMsg} = this.state

    return (
      <div className="app-bg-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <h1 className="main-heading">Welcome to Exploding Kitten</h1>
          <input
            className="user-input"
            placeholder="Enter Your Name"
            onChange={this.getUserName}
            value={username}
          />

          {showUserNameError && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="start-button">
            Start Game
          </button>
        </form>
      </div>
    )
  }
}

export default Start
