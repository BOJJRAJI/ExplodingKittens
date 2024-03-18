import {Component} from 'react'
import Cookies from 'js-cookie'
import {message} from 'antd'
import './index.css'

class GameWin extends Component {
  componentDidMount() {
    this.addPoint()
  }

  addPoint = async () => {
    const {match} = this.props
    const {params} = match
    const {username} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    const apiUrl = `http://localhost:9000/addpoint/${username}`
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const config = {
        className: 'pop-messages',
        content: 'Your current score is added to your total score !',
      }
      setTimeout(() => {
        message.success(config)
      }, 1000)
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  render() {
    return (
      <div className="game-win-container">
        <h1 className="leader-board-heading">You Won The Game</h1>
        <p className="user-score">Your Current Score: 1</p>
        <div className="buttons-container">
          <button
            type="button"
            className="play-again-button"
            onClick={this.onClickLogout}
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }
}

export default GameWin
