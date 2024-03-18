import {Component} from 'react'

import Cookies from 'js-cookie'
import './index.css'

class GameOver extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  render() {
    return (
      <div className="game-over-container">
        <h1 className="game-over-para">
          Game Over! You lost! 😢 Better luck next time! 🎮
        </h1>
        <button
          type="button"
          className="play-again-button"
          onClick={this.onClickLogout}
        >
          Play Again
        </button>
      </div>
    )
  }
}

export default GameOver
