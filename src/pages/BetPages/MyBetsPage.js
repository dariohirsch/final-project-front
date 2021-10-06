import React from "react"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { Nav, Navbar, Container } from "react-bootstrap"

function MyBetsPage(props) {
	const API_URL = process.env.REACT_APP_API_URL
	const leagueId = props.match.params.id
	const { user } = useContext(AuthContext)
	const [mybets, setMybets] = useState([])
	const [userLeague, setUserLeague] = useState([])

	let userId = user._id
	const history = useHistory()

	useEffect(() => {
		getAllbets()
	}, [])

	const getAllbets = () => {
		let idLeague = {
			leagueId: leagueId,
			userId: userId,
		}

		axios.post(`${API_URL}/get-mybets`, idLeague).then((myBet) => {
			setMybets(myBet.data[0])
		})

		axios.post(`${API_URL}/get-userleague`, idLeague).then((userLeague) => {
			setUserLeague(userLeague.data[0])
		})
	}

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link className="navInLeague"> League {userLeague.name}</Nav.Link>
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
							<Nav.Link className="navInLeague2"> Coins {mybets.coinsInLeague}</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<h1> You've {mybets.coinsInLeague + mybets.inPlayCoins} coins </h1>
			<h2> {mybets.coinsInLeague} coins to bet </h2>
			<h2> You're playing {mybets.inPlayCoins} coins in open bets </h2>

			{mybets.bets?.map((bet) => (
				<>
					<p className="myBetsP1">Match: {bet.betMatch} </p>
					<p className="myBetsP"> Date: {new Date(bet.matchTime * 1000).toLocaleString()} </p>
					<p className="myBetsP"> Status: {bet.status} </p>
					<p className="myBetsP"> Signe: {bet.betSigne} </p>
					<p className="myBetsP"> Coins to win: {bet.coinsToWin} </p>
					<p className="myBetsP"> Bet amount: {bet.betAmount} </p>
				</>
			))}
		</>
	)
}

export default MyBetsPage
