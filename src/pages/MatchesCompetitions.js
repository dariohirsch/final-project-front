import React from "react"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { Card, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { AuthContext } from "./../context/auth.context"
import { Link } from "react-router-dom"

function MatchesCompetitions(props) {
	const competitionId = props.match.params.id

	const [match, setMatch] = useState([])
	const [loadingDetails, setLoadingDetails] = useState(true)
	const [matches, setCompetition] = useState([])
	const [loading, setLoading] = useState(true)
	const { isLoggedIn, isLoading } = useContext(AuthContext)
	const history = useHistory()

	let homeTeam
	let awayTeam
	let homeCuote
	let drawCuote
	let awayCuote

	useEffect(() => {
		axios.get(`https://api.b365api.com/v1/bet365/upcoming?sport_id=1&token=98118-e5AVNY35CKcRQ3&league_id=${competitionId}`).then((response) => {
			let matchesList = response.data.results
			console.log(matchesList)
			setCompetition(matchesList)
			setLoading(false)
		})
	}, [])

	const showDetails = (id) => {
		axios
			.get(`https://api.b365api.com/v3/bet365/prematch?token=98118-e5AVNY35CKcRQ3&FI=${id}`)
			.then((match) => {
				match.data.id = id
				console.log("match", match)
				setMatch(match.data)
				// console.log("estooooooooooo", match.data)
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
	}

	if (loading === true) {
		return <p>loading</p>
	} else {
		// console.log(cuota.results);
		return (
			<div className="row">
				<div className="matcheslist col-6" style={{ overflow: "scroll", maxHeight: "80vh" }}>
					{matches.map((match) => (
						<div key={match.name} className="card cardStyle">
							<Card border="primary" style={{ width: "18rem" }}>
								<Card.Body>
									<Card.Title>{match.league.name}: </Card.Title>
									<Card.Title>Partido: </Card.Title>
									<Card.Text>{match.home.name}</Card.Text>
									<Card.Text>{match.away.name}</Card.Text>
									<Card.Text>{match.id}</Card.Text>
									<Button
										onClick={() => {
											showDetails(match.id)
										}}
										variant="primary"
									>
										Go odds details
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
							<h1>
								{homeTeam} vs {awayTeam}
							</h1>
							<form>
								<h3>Cuotas del partido</h3>
								<h5>{homeTeam}</h5>
								{isLoggedIn ? (
									<Link to={`/competitions/matchodds/${match.id}/bethome`}>
										<p>{homeCuote}</p>
									</Link>
								) : (
									<p>x.xx</p>
								)}

								<h5>Empate</h5>
								{isLoggedIn ? (
									<Link to={`/competitions/matchodds/${match.id}/betdraw`}>
										<p>{drawCuote}</p>
									</Link>
								) : (
									<p>x.xx</p>
								)}

								<h5>{awayTeam}</h5>
								{isLoggedIn ? (
									<Link to={`/competitions/matchodds/${match.id}/betaway`}>
										<p>{awayCuote}</p>
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
