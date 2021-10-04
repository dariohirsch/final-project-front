import { useEffect, useState } from "react"

import React from "react"
import axios from "axios"

function BetResults() {
	const API_URL = process.env.REACT_APP_API_URL
	const [bets, setBets] = useState([])
	const [betResult, setBetResult] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getAllBets()
		betCheck()
	}, [])

	const getAllBets = () => {
		axios
			.get(`${API_URL}/bet-results`)
			.then((response) => {
				setBets(response.data)
				setLoading(false)
			})

			.catch((error) => console.log(error))
	}

	let actualTime = new Date()
	let actualTimeToEpoch = Date.parse(actualTime) / 1000
	// console.log("bets", bets)

	const betCheck = () => {
		if (!loading) {
			// to make the call to the API only with the games that are finished

			bets.map((bet) => {
				if (bet.matchTime + 9000 > actualTimeToEpoch) {
					let betMatchId = bet.matchId
					axios.get(`https://api.b365api.com/v1/bet365/result?token=98735-GtE0VpaDW6UXg3&event_id=${betMatchId}`).then((response) => {
						console.log("response", response)
						let homeGoals = response.data.results[0].home.name
						// let awayGoals = response.data.results.scores[2].away

						// setBetResult(response.data.results).then(() => {
						// 	let homeGoals = response.data.results.scores[2].home
						// 	let awayGoals = betResult.scores[2].away

						console.log("home goals", homeGoals)
						// console.log("away goals", awayGoals)
					})
				}
				return "hola"
			})
		}
	}

	return <div>hola</div>
}

export default BetResults
