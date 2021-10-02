import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

function MatchOdds(props) {
	const matchId = props.match.params.id

	const [matchs, setMatchs] = useState([])
	const [loading, setLoading] = useState(true)
	const { isLoggedIn, isLoading } = useContext(AuthContext)

	useEffect(() => {
		axios.get(`https://api.b365api.com/v3/bet365/prematch?token=98735-GtE0VpaDW6UXg3&FI=${matchId}`).then((matchsApi) => {
			setMatchs(matchsApi.data)
			setLoading(false)
		})
	}, [])

	if (loading === true) {
		return <p>loading</p>
	} else {
		let homeTeam = matchs.results[0].others[30].sp.half_time_result_total_goals.odds[0].team
		let awayTeam = matchs.results[0].others[30].sp.half_time_result_total_goals.odds[1].team
		let homeCuote = matchs.results[0].main.sp.full_time_result.odds[0].odds
		let drawCuote = matchs.results[0].main.sp.full_time_result.odds[1].odds
		let awayCuote = matchs.results[0].main.sp.full_time_result.odds[2].odds
		return (
			<div className="singleMatch">
				<h1>
					{homeTeam} vs {awayTeam}
				</h1>
				<form>
					<h3>Cuotas del partido</h3>
					<h5>{homeTeam}</h5>
					{isLoggedIn ? (
						<Link to={`/competitions/matchodds/${matchId}/bethome`}>
							<p>{homeCuote}</p>
						</Link>
					) : (
						<p>x.xx</p>
					)}

					<h5>Empate</h5>
					{isLoggedIn ? (
						<Link to={`/competitions/matchodds/${matchId}/betdraw`}>
							<p>{drawCuote}</p>
						</Link>
					) : (
						<p>x.xx</p>
					)}

					<h5>{awayTeam}</h5>
					{isLoggedIn ? (
						<Link to={`/competitions/matchodds/${matchId}/betaway`}>
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
		)
	}
}

export default MatchOdds
