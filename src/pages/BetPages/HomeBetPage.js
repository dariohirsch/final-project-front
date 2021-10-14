import React from "react"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { Nav, Navbar, Container } from "react-bootstrap"

function HomeBetPage(props) {
	const matchId = props.match.params.matchId
	const leagueId = props.match.params.id
	const matchTime = props.match.params.matchTime
	const finishDate = props.match.params.finishDate

	const API_URL = process.env.REACT_APP_API_URL

	const [matchs, setMatchs] = useState([])
	const [loading, setLoading] = useState(true)
	const history = useHistory()
	const [coinsAmount, setCoinsAmount] = useState(0)
	const [userInLeague, setUserInLeague] = useState(0)
	const { user } = useContext(AuthContext)
	const [userLeague, setUserLeague] = useState("")

	let homeCuote
	let namesMatch
	let homeTeam
	let awayTeam
	let nameTeams

	let userId = user._id

	useEffect(() => {
		axios.get(`https://api.b365api.com/v3/bet365/prematch?token=100333-basbqm5dk2PGt7&FI=${matchId}`).then((matchsApi) => {
			setMatchs(matchsApi.data)
			setLoading(false)

			let coinsInLeagueUser = {
				userId: userId,
				leagueId: leagueId,
			}

			axios.post(`${API_URL}/get-userinleague`, coinsInLeagueUser).then((userInLeague) => {
				setUserInLeague(userInLeague.data[0])
			})

			axios.post(`${API_URL}/get-userleague`, coinsInLeagueUser).then((userLeague) => {
				setUserLeague(userLeague.data[0])
			})
		})
	}, [])

	if (loading === true) {
		return <p>loading</p>
	} else {
		homeCuote = matchs.results[0].main.sp.full_time_result.odds[0].odds
		// drawCuote = matchs.results[0].main.sp.full_time_result.odds[1].odds
		// awayCuote = matchs.results[0].main.sp.full_time_result.odds[2].odds
		namesMatch = matchs.results[0].main.sp.half_time_full_time.odds[2].name

		nameTeams = namesMatch.split(" - ", 2)
		homeTeam = nameTeams[0]
		awayTeam = nameTeams[1]
		let coinsPotencials = coinsAmount * homeCuote
		let coinsInLeague = userInLeague.coinsInLeague
		let coinsInLeagueUpdate = coinsInLeague - coinsAmount
		//console.log(`SOY COINS IN LEAGUE` , coinsInLeagueUpdate)

		const handleCoinsAmountChange = (e) => {
			setCoinsAmount(e.target.value)
		}

		const handleSubmitForm = (e) => {
			// console.log(e.target[2].value)
			e.preventDefault()

			let betInfo = {
				betMatch: `${homeTeam} vs ${awayTeam}`,
				betAmount: parseInt(coinsAmount),
				coinsToWin: parseInt(coinsPotencials),
				betSigne: "betHome",
				leagueId: leagueId,
				matchId: matchId,
				matchTime: matchTime,
				userId: userId,
				coinsInLeague: coinsInLeagueUpdate,
				inPlayCoins: userInLeague.inPlayCoins + parseInt(coinsAmount),
				condition: "open",
				status: "",
			}

			//console.log(betInfo)

			axios
				.post(`${API_URL}/place-bet`, betInfo)

				.then(() => {
					history.push(`/league/${leagueId}`)
				})
		}

		return (
			<>
				<Navbar bg="" variant="dark" className="sub-navbar" expand="lg">
					<Container>
						<Nav className="me-auto subNavDet">
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
							<Nav className="nav-text-right"> Coins {userInLeague.coinsInLeague}</Nav>
							<Nav className="nav-text-right2"> {userLeague.name}</Nav>
						</Nav>
					</Container>
				</Navbar>
				<div className="singleMatch">
					<h1>
						{homeTeam} vs {awayTeam}
					</h1>

					{/* <Card style={{ width: "18rem" }}> */}

					<h5>You are betting for: {homeTeam}</h5>

					<p>Coute: {homeCuote}</p>
					<form onSubmit={handleSubmitForm}>
						{/* <input hidden name="league._id" value={league._id}></input> */}
						<input type="number" name="coinsAmount" className="bet-input" value={coinsAmount} onChange={handleCoinsAmountChange} placeholder="coins to bet" />
						<h6>
							{" "}
							<b>Potencial winnings {coinsPotencials}</b>{" "}
						</h6>
						{finishDate < matchTime ? (
							<h4 className="red-text"> Match date is after league finish date! </h4>
						) : coinsInLeagueUpdate < 0 ? (
							<h1 className="red-text"> You don't have enough coins </h1>
						) : (
							<h5>
								{" "}
								<button className="bet-button bet-button-two" type="submit">
									PLACE BET
								</button>{" "}
							</h5>
						)}
					</form>
				</div>
			</>
		)
	}
}

export default HomeBetPage
