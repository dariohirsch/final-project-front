import { useEffect, useState } from "react"

import React from "react"
import axios from "axios"

function BetResults() {
	const API_URL = process.env.REACT_APP_API_URL
	const [bets, setBets] = useState([])

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getAllBets()

		// getWonBets()
	}, [])

	useEffect(() => {
		console.log(loading)
		if (!loading) {
			betCheck()
		}
	}, [loading])

	// get only open bets (filter on server)

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

	const betCheck = () => {
		bets.map((bet) => {
			console.log("he entrado en betcheck")
			// to make the call to the API only with the games that are finished
			if (bet.matchTime < actualTimeToEpoch) {
				let betMatchId = bet.matchId
				axios.get(`https://api.b365api.com/v1/bet365/result?token=99095-GEZxtGrJVsIYLq&event_id=${betMatchId}`).then((response) => {
					let homeGoals = response.data.results[0].scores[2].home
					let awayGoals = response.data.results[0].scores[2].away
					let result = ""
					if (homeGoals === awayGoals) {
						result = "betDraw"
					} else if (homeGoals > awayGoals) {
						result = "betHome"
					} else {
						result = "betAway"
					}

					if (result === bet.betSigne) {
						let betId = {
							betId: bet._id,
						}
						axios.post(`${API_URL}/bet-check-status-win`, betId).then((response) => {
							console.log("users in league??", response)
						})
					} else {
						let betId = {
							betId: bet._id,
						}
						axios.post(`${API_URL}/bet-check-status-lost`, betId).then((response) => {})
					}
				})
			}
			return "hola"
		})
	}

	// const getWonBets = () => {
	// 	// get all won bets
	// 	axios.get(`${API_URL}/won-bets`).then((response) => {
	// 		console.log(response)
	// 	})
	// }

	return <></>
}

export default BetResults
