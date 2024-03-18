import './index.css'

const TopItem = props => {
  const {itemDetails} = props
  const {name, score} = itemDetails
  return (
    <li className="topper-list">
      <h1 className="topper-heading">{name}</h1>
      <h1 className="topper-heading">{score}</h1>
    </li>
  )
}

export default TopItem
