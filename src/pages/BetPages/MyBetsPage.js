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
			<Navbar bg="" className="sub-navbar" variant="dark" expand="lg">
				<Container>
					<Nav className="me-auto">
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
					</Nav>
					<Nav className="nav-text-right">
						<Nav className="nav-text-right"> Coins {mybets.coinsInLeague}</Nav>
						<Nav className="nav-text-right"> {userLeague.name}</Nav>
					</Nav>
				</Container>
			</Navbar>

			<h4> You have {mybets.inPlayCoins} in play coins </h4>
			<hr></hr>
			<div className="container ticket-container">
				{mybets.bets?.map((bet) => (
					<>
						{bet.status === "pending" ? (
							<div className="ticket ticket-pending">
								<p className="myBetsP1">{bet.betMatch} </p>
								<p className="myBetsP">
									{" "}
									Date - <b>{new Date(bet.matchTime * 1000).toLocaleString()}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Status - <b>{bet.status}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Bet - <b>{bet.betSigne}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Coins to win - <b>{bet.coinsToWin}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Bet amount - <b>{bet.betAmount}</b>{" "}
								</p>
							</div>
						) : bet.status === "won" ? (
							<div className="ticket ticket-won">
								<p className="myBetsP1">{bet.betMatch} </p>
								<p className="myBetsP">
									{" "}
									Date - <b>{new Date(bet.matchTime * 1000).toLocaleString()}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Status - <b>{bet.status}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Bet - <b>{bet.betSigne}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Coins to win - <b>{bet.coinsToWin}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Bet amount - <b>{bet.betAmount}</b>{" "}
								</p>
							</div>
						) : (
							<div className="ticket ticket-lost">
								<p className="myBetsP1">{bet.betMatch} </p>
								<p className="myBetsP">
									{" "}
									Date - <b>{new Date(bet.matchTime * 1000).toLocaleString()}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Status - <b>{bet.status}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Bet - <b>{bet.betSigne}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Coins to win - <b>{bet.coinsToWin}</b>{" "}
								</p>
								<p className="myBetsP">
									{" "}
									Bet amount - <b>{bet.betAmount}</b>{" "}
								</p>
							</div>
						)}
					</>
				))}
			</div>
		</>
	)
}

export default MyBetsPage
