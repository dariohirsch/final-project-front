import { useEffect, useState, useContext } from "react"
import { DiscussionEmbed } from "disqus-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import React from "react"
import axios from "axios"
import randomColor from "randomcolor"
import { useHistory } from "react-router-dom"
import { Nav, Navbar, Container } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"

function LeagueDetails(props) {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagueInfo, setLeagueInfo] = useState()
	const [loading, setLoading] = useState(true)
	const [userInLeague, setUserInLeague] = useState([])
	const [userInLeagueCoins, setUserInLeagueCoins] = useState([])
	const { user } = useContext(AuthContext)

	const leagueId = props.match.params.id
	const history = useHistory()
	let userId = user._id

	let data = [{}]

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

		let coinsInLeagueUserCoins = {
			userId: userId,
			leagueId: leagueId,
		}

		axios.post(`${API_URL}/get-userinleague`, coinsInLeagueUserCoins).then((userInLeague) => {
			setUserInLeagueCoins(userInLeague.data[0])
		})
	}, [])

	const handleSubmitForm = (e) => {
		e.preventDefault()

		history.push(`/competitions/bet/${e.target[0].value}`)
	}

	if (loading === true) {
		return <p>loading</p>
	} else {
		return (
			<>
				<Navbar collapseOnSelect bg="" variant="dark" className="sub-navbar" expand="lg">
					<Container>
						<Nav className="me-auto">
							<Navbar.Toggle />
							<Nav.Link
								className="navInLeague2"
								onClick={() => {
									history.push(`/league/${leagueId}`)
								}}
							>
								Home
							</Nav.Link>
							<Nav.Link
								className="navInLeague2"
								onClick={() => {
									history.push(`/my-bets/${leagueId}`)
								}}
							>
								My bets
							</Nav.Link>
							<Nav.Link
								className="navInLeague2"
								onClick={() => {
									history.push(`/competitions/bet/${leagueId}`)
								}}
							>
								Bet
							</Nav.Link>
						</Nav>
						<Nav className="nav-text-right">
							<Nav className="nav-text-right"> Coins {userInLeagueCoins.coinsInLeague}</Nav>
							<Nav className="nav-text-right">
								{" "}
								<b>{leagueInfo.name}</b>
							</Nav>
						</Nav>
					</Container>
				</Navbar>
				<div className="row">
					<div className="col-6">
						<h2>Welcome to {leagueInfo.name}</h2>
						<h5>We are playing for {leagueInfo.participants.length * leagueInfo.inscriptionPrice}€</h5>

						{leagueInfo.finishDate < new Date() / 1000 ? (
							<p className="red-text">League has finished. You can't bet anymore</p>
						) : (
							<form onSubmit={handleSubmitForm}>
								<input hidden name="league._id" value={leagueId}></input>
								<button className="bet-button-details" type="submit">
									BET
								</button>
							</form>
						)}
						<div className="graficaDetails">
							{userInLeague.map((user) => {
								data[0][user.userId?.name] = user.coinsInLeague
							})}

							<BarChart
								width={450}
								height={270}
								data={data}
								margin={{
									top: 40,
									right: 30,
									left: 20,
									bottom: 25,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								{userInLeague.map((user) => {
									return (
										<>
											<Bar dataKey={user.userId?.name} fill={randomColor({ luminosity: "dark" })} />
										</>
									)
								})}
							</BarChart>
						</div>
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
											<td>{user.coinsInLeague}</td>
											<td>{user.inPlayCoins}</td>
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
