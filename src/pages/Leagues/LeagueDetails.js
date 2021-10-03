import { useEffect, useState } from "react"

import React from "react"
import axios from "axios"

function LeagueDetails(props) {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagueInfo, setLeagueInfo] = useState()
	const [loading, setLoading] = useState(true)
	const [userInLeague, setUserInLeague] = useState([])
	// console.log(props)

	const leagueId = props.match.params.id

	useEffect(() => {
		axios.get(`${API_URL}/league-details/${leagueId}`).then((response) => {
			setLeagueInfo(response.data[0])
			setLoading(false)
		})

		let coinsInLeagueUser = {
			leagueId: leagueId,
		}

		axios.post(`${API_URL}/get-userinleague2`, coinsInLeagueUser).then((userInLeague) => {
			console.log("user in league xxxxxxxxxx", userInLeague)
			setUserInLeague(userInLeague.data)
		})
	}, [])

	if (loading === true) {
		return <p>loading</p>
	} else {
		return (
			<div className="row">
				<div className="col-6">
					<h2>Welcome to {leagueInfo.name}</h2>
					<h5>We are playing for {leagueInfo.participants.length * leagueInfo.inscriptionPrice}€</h5>
				</div>
				<div className="col-6">
					<h2>Clasification</h2>
					<ol>
						{userInLeague.map((user) => {
							return (
								<li>
									{/* {user.userId.name}  */}
									{user.userId.name}
									{user.coinsInLeague}
								</li>
							)
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default LeagueDetails
