import {Component} from 'react'
import ReactCardFlip from 'react-card-flip'
import './index.css'

class Card extends Component {
  state = {isFlipped: false}

  handleClick = () => {
    const {cardDetails, drawCard} = this.props

    this.setState(prevState => ({isFlipped: !prevState.isFlipped}))

    setTimeout(() => {
      drawCard(cardDetails.id)
    }, 2000)
  }

  render() {
    const {isFlipped} = this.state
    const {cardDetails} = this.props
    const {cardName, drawCardUrl} = cardDetails

    return (
      <li className="list-card">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <div className="card-empty-container">
            <img
              src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710585497/card_empty_vka27q.webp"
              alt="card"
              className="card-empty-image"
              onClick={this.handleClick}
            />
          </div>
          <div className="card-empty-container">
            <img
              src={drawCardUrl}
              alt={cardName}
              className="card-empty-image"
              onClick={this.handleClick}
            />
          </div>
        </ReactCardFlip>
      </li>
    )
  }
}

export default Card
