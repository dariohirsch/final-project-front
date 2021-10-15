import React from "react"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { Card, Button, Nav, Navbar, Container } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

function MatchesCompetitionsBet(props) {
	const leagueId = props.match.params.id
	const competitionId = props.match.params.compId
	const history = useHistory()

	const [match, setMatch] = useState([])
	const [loadingDetails, setLoadingDetails] = useState(true)
	const [matches, setCompetition] = useState([])
	const [loading, setLoading] = useState(true)
	const { isLoggedIn } = useContext(AuthContext)
	const [userInLeague, setUserInLeague] = useState(0)
	const [userLeague, setUserLeague] = useState("")
	const [matchTime, setMatchTime] = useState(0)
	const API_URL = process.env.REACT_APP_API_URL
	const { user } = useContext(AuthContext)

	let homeTeam
	let awayTeam
	let homeCuote
	let drawCuote
	let awayCuote
	let overHeader
	let overName
	let overCuote
	let underHeader
	let underName
	let underCuote
	let namesMatch
	let nameTeams
	let userId = user._id
	let finishDate = userLeague.finishDate

	useEffect(() => {
		axios.get(`https://api.b365api.com/v1/bet365/upcoming?sport_id=1&token=100333-basbqm5dk2PGt7&league_id=${competitionId}`).then((response) => {
			let matchesList = response.data.results
			// console.log(matchesList)
			setCompetition(matchesList)
			setLoading(false)

			let userLeague = {
				leagueId: leagueId,
				userId: user._id,
			}

			axios.post(`${API_URL}/get-userleague`, userLeague).then((userLeague) => {
				setUserLeague(userLeague.data[0])
			})

			let coinsInLeagueUser = {
				userId: userId,
				leagueId: leagueId,
			}

			axios.post(`${API_URL}/get-userinleague`, coinsInLeagueUser).then((userInLeague) => {
				setUserInLeague(userInLeague.data[0])
			})
		})
	}, [])

	const showDetails = (id) => {
		axios
			.get(`https://api.b365api.com/v3/bet365/prematch?token=100333-basbqm5dk2PGt7&FI=${id}`)
			.then((match) => {
				match.data.id = id
				console.log("match", match)
				setMatch(match.data)
				setLoadingDetails(false)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	if (loadingDetails === false) {
		homeCuote = match.results[0].main.sp.full_time_result.odds[0].odds
		drawCuote = match.results[0].main.sp.full_time_result.odds[1].odds
		awayCuote = match.results[0].main.sp.full_time_result.odds[2].odds
		overHeader = match.results[0].main.sp.goals_over_under.odds[0].header
		overName = match.results[0].main.sp.goals_over_under.odds[0].name
		overCuote = match.results[0].main.sp.goals_over_under.odds[0].odds
		underHeader = match.results[0].main.sp.goals_over_under.odds[1].header
		underName = match.results[0].main.sp.goals_over_under.odds[1].name
		underCuote = match.results[0].main.sp.goals_over_under.odds[1].odds
		namesMatch = match.results[0].main.sp.half_time_full_time.odds[2].name

		nameTeams = namesMatch.split(" - ", 2)
		homeTeam = nameTeams[0]
		awayTeam = nameTeams[1]
	}

	if (loading === true) {
		return <p>loading</p>
	} else {
		return (
			<>
				<Navbar bg="" className="sub-navbar" variant="dark" expand="lg">
					<Container>
						<Nav className="me-auto subNavDet">
							<Nav.Link
								className="navInLeague2"
								onClick={() => {
									history.push(`/league/${leagueId}`)
								}}
							>
								Home
							</Nav.Link>
							<Nav.Link
								className="navInLeague2"
								onClick={() => {
									history.push(`/my-bets/${leagueId}`)
								}}
							>
								My bets
							</Nav.Link>
							<Nav.Link
								className="navInLeague2"
								onClick={() => {
									history.push(`/competitions/bet/${leagueId}`)
								}}
							>
								Bet
							</Nav.Link>
						</Nav>
						<Nav className="nav-text-right">
							<Nav className="nav-text-right"> Coins {userInLeague.coinsInLeague}</Nav>
							<Nav className="nav-text-right2"> {userLeague.name}</Nav>
						</Nav>
					</Container>
				</Navbar>
				<div className="row">
					<div className="matcheslist col-6" style={{ overflow: "scroll", maxHeight: "80vh" }}>
						{matches.map((match) => (
							<div key={match.name} className="card card-bet cardStyle">
								<Card className="card-size">
									<Card.Body>
										{/* <Card.Title>{match.league.name}: </Card.Title> */}
										{/* <Card.Title>Match: </Card.Title> */}
										<Card.Text className="cardd-text">{match.home.name}</Card.Text>
										<Card.Text className="cardd-text">{match.away.name}</Card.Text>
										{finishDate < match.time ? (
											<>
												<p className="red-text"> Match date is after league finish date!</p>
												<Card.Text className="red-text">{new Date(match.time * 1000).toLocaleString()}</Card.Text>
											</>
										) : (
											<Card.Text>{new Date(match.time * 1000).toLocaleString()}</Card.Text>
										)}
										<Button
											className="see-odds-button"
											onClick={() => {
												showDetails(match.id)
												setMatchTime(match.time)
											}}
											variant="primary"
										>
											See odds details
										</Button>
									</Card.Body>
								</Card>
							</div>
						))}
					</div>
					{loadingDetails ? (
						<p></p>
					) : (
						<div className="matchDetails col-6">
							<hr className="divisor" />
							<div className="singleMatch">
								<h2>{namesMatch}</h2>
								<h4 className="matchOddsTitle"> Match Odds </h4>
								<form>
									<h5>Full time result</h5>
									<div className="bet-info">
										{isLoggedIn ? (
											<Link className="link-odds" to={`/competitions/${leagueId}/matchodds/${match.id}/bethome/${matchTime}/${finishDate}`}>
												<p>{homeCuote}</p>
											</Link>
										) : (
											<p>x.xx</p>
										)}

										{isLoggedIn ? (
											<Link className="link-odds" to={`/competitions/${leagueId}/matchodds/${match.id}/betdraw/${matchTime}/${finishDate}`}>
												<p>{drawCuote}</p>
											</Link>
										) : (
											<p>x.xx</p>
										)}

										{isLoggedIn ? (
											<Link className="link-odds" to={`/competitions/${leagueId}/matchodds/${match.id}/betaway/${matchTime}/${finishDate}`}>
												<p>{awayCuote}</p>
											</Link>
										) : (
											<p>x.xx</p>
										)}
									</div>
									<h5> How many goals score in the match </h5>
									<h6>
										{overHeader} {overName} goals
									</h6>
									{isLoggedIn ? (
										<Link className="link-odds" to={`/competitions/${leagueId}/matchodds/${match.id}/betaway`}>
											<p>{overCuote}</p>
										</Link>
									) : (
										<p>x.xx</p>
									)}

									<h6>
										{underHeader} {underName} goals
									</h6>
									{isLoggedIn ? (
										<Link className="link-odds" to={`/competitions/${leagueId}/matchodds/${match.id}/betaway`}>
											<p>{underCuote}</p>
										</Link>
									) : (
										<p>x.xx</p>
									)}

									{isLoggedIn ? (
										<div></div>
									) : (
										<h4>
											To see all the cuotes, please <Link to="/login">log in</Link> or <Link to="signup">sign up </Link>
										</h4>
									)}
								</form>
							</div>
						</div>
					)}
				</div>
			</>
		)
	}
}

export default MatchesCompetitionsBet
