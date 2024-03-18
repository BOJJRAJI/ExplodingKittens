import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Start from './components/Start'
import LeaderBoard from './components/LeaderBoard'
import NotFound from './components/NotFound'
import PlayGround from './components/PlayGround'
import GameOver from './components/GameOver'
import GameWin from './components/GameWin'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Start} />
      <ProtectedRoute exact path="/game/:username" component={PlayGround} />
      <ProtectedRoute
        exact
        path="/leaderboard/:username"
        component={LeaderBoard}
      />
      <ProtectedRoute exact path="/wongame/:username" component={GameWin} />
      <ProtectedRoute exact path="/gameover" component={GameOver} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
