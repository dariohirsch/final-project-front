import "./App.css"
import { Switch, Route } from "react-router-dom"
import Navigation from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CompetitionsPage from "./pages/Competitions/CompetitionsPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import AnonRoute from "./components/AnonRoute" // <== IMPORT
import { Container } from "react-bootstrap"
import MatchesCompetitions from "./pages/Competitions/MatchesCompetitions"
import HomeBetPage from "./pages/BetPages/HomeBetPage"
import DrawBetPage from "./pages/BetPages/DrawBetPage"
import AwayBetPage from "./pages/BetPages/AwayBetPage"
import CreateLeague from "./pages/Leagues/CreateLeague"
import AllLeagues from "./pages/Leagues/AllLeagues"
import MyLeagues from "./pages/Leagues/MyLeagues"
import LeagueDetails from "./pages/Leagues/LeagueDetails"
import CompetitionsBet from "./pages/Competitions/CompetitionsBet"
import PrivateRoute from "./components/PrivateRoute"
import MatchesCompetitionsBet from "./pages/Competitions/MatchesCompetitionsBet"

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
					<Route
						exact
						path="/competitions/bet/:id/:compId"
						render={(routeProps) => {
							return <MatchesCompetitionsBet {...routeProps} />
						}}
					/>
					<Route
						exact
						path="/competitions/bet/:id"
						render={(routeProps) => {
							return <CompetitionsBet {...routeProps} />
						}}
					/>
					<Route exact path="/create-league" component={CreateLeague} />
					<PrivateRoute exact path="/my-leagues" component={MyLeagues} />
					<Route
						exact
						path="/league/:id"
						render={(routeProps) => {
							return <LeagueDetails {...routeProps} />
						}}
					/>
					{/* <Route path="/competitions/matchodds/:id" component={MatchOdds} /> */}

					<Route
						exact
						path="/competitions/:id/matchodds/:matchId/bethome"
						render={(routeProps) => {
							return <HomeBetPage {...routeProps} />
						}}
					/>
					<Route
						exact
						path="/competitions/:id/matchodds/:matchId/betDraw"
						render={(routeProps) => {
							return <DrawBetPage {...routeProps} />
						}}
					/>
					<Route
						exact
						path="/competitions/:id/matchodds/:matchId/betAway"
						render={(routeProps) => {
							return <AwayBetPage {...routeProps} />
						}}
					/>

					<Route path="/all-leagues" component={AllLeagues} />

					<Route path="/competitions/:id" component={MatchesCompetitions} />
				</Switch>
			</Container>
		</div>
	)
}

export default App
