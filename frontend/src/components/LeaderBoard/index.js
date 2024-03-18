import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import TopItem from '../TopItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class LeaderBoard extends Component {
  state = {
    leaderBoardData: [],
    apiStatus: apiStatusConstants.initial,
    currentUserData: {},
  }

  componentDidMount() {
    this.getLeaderBoardData()
  }

  getLeaderBoardData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.success,
    })
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
    const apiUrl = `http://localhost:9000/leaderboard/${username}`
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const arrayData = [data[0], data[1], data[2]]
      this.setState({
        leaderBoardData: arrayData,
        currentUserData: data[3],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        leaderBoardData: [],
        currentUserData: {},
      })
    }
  }

  renderToppersView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMainView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderMainView = () => {
    const {leaderBoardData} = this.state
    return (
      <ul className="data-ul-container">
        <li className="list-headings-container">
          <h1 className="display-main-heading">Username</h1>
          <h1 className="display-main-heading">Score</h1>
        </li>
        {leaderBoardData.map(item => (
          <TopItem itemDetails={item} key={item.score} />
        ))}
      </ul>
    )
  }

  render() {
    const {currentUserData, apiStatus} = this.state

    return (
      <div className="bg-leader-board-container">
        <div className="images-headings-container">
          <img
            src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710501005/badge-MPZGGoid_alpnxg.png"
            alt="badge"
            className="badge-image"
          />
          <h1 className="leader-board-heading">LEADERBOARD</h1>
          <img
            src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710501005/badge-MPZGGoid_alpnxg.png"
            alt="badge"
            className="badge-image"
          />
        </div>
        {apiStatus === apiStatusConstants.success && (
          <div className="user-data-display-container">
            <p className="user-score">Hey👋, {currentUserData.name}!</p>
            <p className="user-score">
              Your Total Score is {currentUserData.score}
            </p>
          </div>
        )}
        <div className="wish-images-container">
          <p className="para-element"> Congratulations to the Top 3 Players </p>
          <img
            src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1710568104/trophy-clipart-transparent-15.png_saufup.png"
            alt="trophy"
            className="trophy-image"
          />
        </div>

        {this.renderToppersView()}
        <Link to={`/game/${currentUserData.name}`}>
          <button type="button" className="play-again-button">
            Play Again
          </button>
        </Link>
      </div>
    )
  }
}

export default LeaderBoard
