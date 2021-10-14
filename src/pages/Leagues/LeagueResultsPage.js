import { useEffect, useState } from "react"

import React from "react"
import axios from "axios"

function LeagueResults() {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagues, setLeagues] = useState([])

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getAllLeagues()

		// getWonBets()
	}, [])

	// useEffect(() => {
	// 	console.log(loading)
	// 	if (!loading) {
	// 		betCheck()
	// 	}
	// }, [loading])

	// get only open leagues (filter on server)

	const getAllLeagues = () => {
		axios
			.get(`${API_URL}/leagues-results`)
			.then((response) => {
				setLeagues(response.data)
				setLoading(false)
			})

			.catch((error) => console.log(error))
	}

	console.log("son las ligas", leagues)

	// let actualTime = new Date()
	// let actualTimeToEpoch = Date.parse(actualTime) / 1000

	// const betCheck = () => {
	// 	bets.map((bet) => {
	// 		console.log("he entrado en betcheck")
	// 		// to make the call to the API only with the games that are finished
	// 		if (bet.matchTime < actualTimeToEpoch) {
	// 			let betMatchId = bet.matchId
	// 			axios.get(`https://api.b365api.com/v1/bet365/result?token=100333-basbqm5dk2PGt7&event_id=${betMatchId}`).then((response) => {
	// 				let homeGoals = response.data.results[0].scores[2].home
	// 				let awayGoals = response.data.results[0].scores[2].away
	// 				let result = ""
	// 				if (homeGoals === awayGoals) {
	// 					result = "betDraw"
	// 				} else if (homeGoals > awayGoals) {
	// 					result = "betHome"
	// 				} else {
	// 					result = "betAway"
	// 				}

	// 				if (result === bet.betSigne) {
	// 					let betId = {
	// 						betId: bet._id,
	// 					}
	// 					axios.post(`${API_URL}/bet-check-status-win`, betId).then((response) => {
	// 						console.log("users in league??", response)
	// 					})
	// 				} else {
	// 					let betId = {
	// 						betId: bet._id,
	// 					}
	// 					axios.post(`${API_URL}/bet-check-status-lost`, betId).then((response) => {})
	// 				}
	// 			})
	// 		}
	// 		return "hola"
	// 	})
	// }

	return <></>
}

export default LeagueResults
