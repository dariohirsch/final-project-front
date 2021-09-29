import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function AwayBetPage(props) {
	const matchId = props.match.params.id

	const [matchs, setMatchs] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(`https://api.b365api.com/v3/bet365/prematch?token=98118-e5AVNY35CKcRQ3&FI=${matchId}`).then((matchsApi) => {
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
					{/* <Card style={{ width: "18rem" }}> */}

					<h5>You are betting for: {awayTeam}</h5>

					<p>Coute: {awayCuote}</p>

					{/* <h5>Empate</h5>
					<p>{drawCuote}</p>
					<h5>{awayTeam}</h5>
					<p>{awayCuote}</p> */}
					{/* </Card> */}
				</form>
			</div>
		)
	}
}

export default AwayBetPage
