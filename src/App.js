import "./App.css"
import { Switch, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CompetitionsPage from "./pages/Competitions/CompetitionsPage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import AnonRoute from "./components/AnonRoute"
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
import BetResults from "./pages/BetPages/BetResultsPage"
import LeagueResults from "./pages/Leagues/LeagueResultsPage"

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

					<Route
						exact
						path="/competitions/:id/matchodds/:matchId/bethome/:matchTime"
						render={(routeProps) => {
							return <HomeBetPage {...routeProps} />
						}}
					/>
					<Route
						exact
						path="/competitions/:id/matchodds/:matchId/betDraw/:matchTime"
						render={(routeProps) => {
							return <DrawBetPage {...routeProps} />
						}}
					/>
					<Route
						exact
						path="/competitions/:id/matchodds/:matchId/betAway/:matchTime"
						render={(routeProps) => {
							return <AwayBetPage {...routeProps} />
						}}
					/>

					<PrivateRoute path="/all-leagues" component={AllLeagues} />

					<Route path="/competitions/:id" component={MatchesCompetitions} />
					<Route exact path="/bet-results" component={BetResults} />
					<Route exact path="/league-results" component={LeagueResults} />
				</Switch>
			</Container>
		</div>
	)
}

export default App
