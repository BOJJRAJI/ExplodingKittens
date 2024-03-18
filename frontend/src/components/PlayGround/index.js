import {Component} from 'react'
import {Link} from 'react-router-dom'
import Card from '../Card'
import './index.css'

const initialCardDetails = [
  {
    id: 1,
    drawCardUrl:
      'https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710592808/cat-with-wry-smile_1f63c_pyacke.png',
    cardName: 'Catcard',
  },
  {
    id: 2,
    drawCardUrl:
      'https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710592832/defuse_image_owtrxx.jpg',
    cardName: 'Defusecard',
  },
  {
    id: 3,
    drawCardUrl:
      'https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710592905/shuffle_image_qr87sh.jpg',
    cardName: 'Shufflecard',
  },
  {
    id: 4,
    drawCardUrl:
      'https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710595960/bomb_whitee_wlvsmr.jpg',
    cardName: 'Explodingkittencard',
  },
  {
    id: 5,
    drawCardUrl:
      'https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710592808/cat-with-wry-smile_1f63c_pyacke.png',
    cardName: 'Catcard',
  },
]

function shuffleArray(array) {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

class PlayGround extends Component {
  state = {
    defuseCount: 0,
    displayResult: 'Start Game By Click On Card',
    cardsInformation: initialCardDetails,
  }

  componentDidMount() {
    this.checkGameIsOverOrNot()
  }

  checkGameIsOverOrNot = () => {
    const answer = shuffleArray(initialCardDetails)
    console.log(answer)
    this.setState({cardsInformation: answer})
  }

  drawCard = id => {
    const {cardsInformation, defuseCount} = this.state
    const filteredInfo = cardsInformation.filter(item => item.id !== id)
    const {match} = this.props
    const {params} = match
    const {username} = params

    switch (id) {
      case 1:
        this.setState({
          displayResult: 'Wooho 🎉 You picked a Cat Card. Keep Going! 🐱',
          cardsInformation: filteredInfo,
        })
        break
      case 2:
        this.setState(prevState => ({
          defuseCount: prevState.defuseCount + 1,
          displayResult:
            'You picked a Defuse Card 🙅‍♂️. You can diffuse the next bomb! 💣',
          cardsInformation: filteredInfo,
        }))
        break
      case 4:
        if (defuseCount > 0) {
          this.setState(prevState => ({
            defuseCount: prevState.defuseCount - 1,
            displayResult:
              'You picked an Exploding Kitten Card 💣, but you defused it! 😶‍🌫️',
            cardsInformation: filteredInfo,
          }))
        } else {
          this.setState({
            displayResult:
              'Oops ❌ You picked an Exploding Kitten Card. You lost 🤯!',
          })
          const {history} = this.props
          setTimeout(() => {
            history.replace(`/gameover`)
          }, 2000)
        }
        break
      case 3:
        console.log(cardsInformation)
        if (cardsInformation.length === 1) {
          this.setState({
            displayResult:
              'Wooho 🎉 You Left With Shuffle Card. You Won The Game',
          })
          const {history} = this.props
          setTimeout(() => {
            history.replace(`/wongame/${username}`)
          }, 2000)
        } else {
          this.setState({
            displayResult:
              'Haha 😆! You picked a Shuffle Card. Restarting the Game...🔀',
            cardsInformation: initialCardDetails,
            defuseCount: 0,
          })
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }

        break
      case 5:
        this.setState({
          displayResult: 'Wooho 🎉 You picked a Cat Card. Keep Going! 🐱',
          cardsInformation: filteredInfo,
        })
        break
      default:
        break
    }
  }

  render() {
    const {defuseCount, displayResult, cardsInformation} = this.state
    const {match} = this.props
    const {params} = match
    const {username} = params
    return (
      <div className="playground-bg-container">
        <div className="header-container">
          <h1 className="defuse-count-heading">Defuse Power : {defuseCount}</h1>
          <h1 className="choose-heading">
            Choose your cards wisely to win the game!
          </h1>
          <Link to={`/leaderboard/${username}`}>
            <button type="button" className="leader-board-button">
              View Your Leaderboard
            </button>
          </Link>
        </div>
        <p className="display-result-para">{displayResult}</p>

        <ul className="all-cards-container">
          {cardsInformation.map(item => (
            <Card cardDetails={item} key={item.id} drawCard={this.drawCard} />
          ))}
        </ul>
      </div>
    )
  }
}

export default PlayGround
