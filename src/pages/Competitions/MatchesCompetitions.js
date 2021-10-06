import React from "react"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { Card, Button } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom"

function MatchesCompetitions(props) {
	const competitionId = props.match.params.id

	const [match, setMatch] = useState([])
	const [loadingDetails, setLoadingDetails] = useState(true)
	const [matches, setCompetition] = useState([])
	const [loading, setLoading] = useState(true)
	const { isLoggedIn } = useContext(AuthContext)

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

	useEffect(() => {
		axios.get(`https://api.b365api.com/v1/bet365/upcoming?sport_id=1&token=99095-GEZxtGrJVsIYLq&league_id=${competitionId}`).then((response) => {
			let matchesList = response.data.results

			setCompetition(matchesList)
			setLoading(false)
		})
	}, [])

	const showDetails = (id) => {
		axios
			.get(`https://api.b365api.com/v3/bet365/prematch?token=99095-GEZxtGrJVsIYLq&FI=${id}`)
			.then((match) => {
				match.data.id = id

				setMatch(match.data)

				setLoadingDetails(false)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	if (loadingDetails === false) {
		// homeTeam = match.results[0].others[30].sp.half_time_result_total_goals.odds[0].team
		// awayTeam = match.results[0].others[30].sp.half_time_result_total_goals.odds[1].team
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
		// dateMatch = new Date(matches[0].time * 1000)

		// dateMatchString = dateMatch.toLocaleString()
		return (
			<div className="row">
				<div className="matcheslist col-6" style={{ overflow: "scroll", maxHeight: "80vh" }}>
					{matches.map((match) => (
						<div key={match.name} className="card cardStyle">
							<Card border="" style={{ width: "18rem" }}>
								<Card.Body>
									<Card.Title>{match.league.name} </Card.Title>
									{/* <Card.Title>Match: </Card.Title> */}
									<Card.Text className="cardd-text">{match.home.name}</Card.Text>
									<Card.Text className="cardd-text">{match.away.name}</Card.Text>

									<Card.Text>{new Date(match.time * 1000).toLocaleString()}</Card.Text>
									<Button
										onClick={() => {
											showDetails(match.id)
										}}
										variant="primary"
										className="see-odds-button"
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
						<div className="singleMatch">
							<h2>{namesMatch}</h2>
							<h4 className="matchOddsTitle"> Match Odds </h4>
							<form>
								<h5>Full time result</h5>
								<div className="bet-info">
									{/* <h6>{homeTeam}</h6> */}
									{isLoggedIn ? (
										<Link to="/all-leagues" className="link-odds">
											<p>{homeCuote}</p>
										</Link>
									) : (
										<p>x.xx</p>
									)}

									{/* <h6>Draw</h6> */}
									{isLoggedIn ? (
										<Link to="/all-leagues" className="link-odds">
											<p>{drawCuote}</p>
										</Link>
									) : (
										<p>x.xx</p>
									)}

									{/* <h6>{awayTeam}</h6> */}
									{isLoggedIn ? (
										<Link to="/all-leagues" className="link-odds">
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
									<Link to="/all-leagues" className="link-odds">
										<p>{overCuote}</p>
									</Link>
								) : (
									<p>x.xx</p>
								)}

								<h6>
									{underHeader} {underName} goals
								</h6>
								{isLoggedIn ? (
									<Link to="/all-leagues" className="link-odds">
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
		)
	}
}

export default MatchesCompetitions
