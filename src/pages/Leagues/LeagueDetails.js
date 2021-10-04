import { useEffect, useState } from "react"
import { DiscussionEmbed } from "disqus-react"
import React from "react"
import axios from "axios"

function LeagueDetails(props) {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagueInfo, setLeagueInfo] = useState()
	const [loading, setLoading] = useState(true)
	const [userInLeague, setUserInLeague] = useState([])

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
			setUserInLeague(userInLeague.data)
		})
	}, [])

	console.log("user in league >>>>>>>>>>>", userInLeague)

	if (loading === true) {
		return <p>loading</p>
	} else {
		return (
			<>
				<div className="row">
					<div className="col-6">
						<h2>Welcome to {leagueInfo.name}</h2>
						<h5>We are playing for {leagueInfo.participants.length * leagueInfo.inscriptionPrice}€</h5>
					</div>
					<div className="col-6">
						<h2>Clasification</h2>
						<table class="table">
							<thead>
								<tr>
									<th scope="col">User</th>
									<th scope="col">Coins</th>
									<th scope="col">Inplay coins</th>
								</tr>
							</thead>
							<tbody>
								{userInLeague.map((user) => {
									return (
										<tr>
											<td>{user.userId?.name}</td>
											<td>{user.realCoinsInLeague}</td>
											<td>{user.coinsInLeague}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div>
					<DiscussionEmbed
						shortname="betfriends"
						config={{
							url: `http://localhost:3000/league/${leagueId}`,
							identifier: `http://localhost:3000/league/${leagueId}`,
							title: `http://localhost:3000/league/${leagueId}`,
							language: "es",
						}}
					/>
				</div>
			</>
		)
	}
}

export default LeagueDetails
