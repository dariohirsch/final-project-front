import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"

function DrawBetPage(props) {
	const matchId = props.match.params.id

	const [matchs, setMatchs] = useState([])
	const [loading, setLoading] = useState(true)

	let drawCuote
	let namesMatch
	let homeTeam
	let awayTeam

	let nameTeams

	useEffect(() => {
		axios.get(`https://api.b365api.com/v3/bet365/prematch?token=98118-e5AVNY35CKcRQ3&FI=${matchId}`).then((matchsApi) => {
			setMatchs(matchsApi.data)
			setLoading(false)
		})
	}, [])

	if (loading === true) {
		return <p>loading</p>
	} else {
		// homeCuote = matchs.results[0].main.sp.full_time_result.odds[0].odds
		drawCuote = matchs.results[0].main.sp.full_time_result.odds[1].odds
		// awayCuote = matchs.results[0].main.sp.full_time_result.odds[2].odds
		namesMatch = matchs.results[0].main.sp.half_time_full_time.odds[2].name

		nameTeams = namesMatch.split(" - ", 2)
		homeTeam = nameTeams[0]
		awayTeam = nameTeams[1]

		return (
			<div className="singleMatch">
				<h1>
					{homeTeam} vs {awayTeam}
				</h1>
				<form>
					{/* <Card style={{ width: "18rem" }}> */}

					<h5>You are betting for: Draw</h5>

					<p>Coute: {drawCuote}</p>

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

export default DrawBetPage
