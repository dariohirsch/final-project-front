import "./App.css"
import { Switch, Route } from "react-router-dom"
import Navigation from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProjectListPage from "./pages/ProjectListPage"
import CompetitionsPage from "./pages/Competitions/CompetitionsPage"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"
import EditProjectPage from "./pages/EditProjectPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import PrivateRoute from "./components/PrivateRoute" // <== IMPORT
import AnonRoute from "./components/AnonRoute" // <== IMPORT
import { Container } from "react-bootstrap"
import MatchesCompetitions from "./pages/MatchesCompetitions"
import MatchOdds from "./pages/MatchOdds"
import HomeBetPage from "./pages/BetPages/HomeBetPage"
import DrawBetPage from "./pages/BetPages/DrawBetPage"
import AwayBetPage from "./pages/BetPages/AwayBetPage"
import CreateLeague from "./pages/Leagues/CreateLeague"
import AllLeagues from "./pages/Leagues/AllLeagues"

function App() {
	return (
		<div className="App">
			<Navigation />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<AnonRoute exact path="/signup" component={SignupPage} />
					<AnonRoute exact path="/login" component={LoginPage} />

					<Route exact path="/competitions" component={CompetitionsPage} />
					<Route exact path="/create-league" component={CreateLeague} />
					<Route path="/competitions/matchodds/:id/bethome" component={HomeBetPage} />
					<Route path="/all-leagues" component={AllLeagues} />
					<Route path="/competitions/matchodds/:id/betdraw" component={DrawBetPage} />
					<Route path="/competitions/matchodds/:id/betaway" component={AwayBetPage} />
					<Route path="/competitions/matchodds/:id" component={MatchOdds} />

					{/* <Route path="/competitions/:id" component={MatchesCompetitions} /> */}
				</Switch>
			</Container>
		</div>
	)
}

export default App
