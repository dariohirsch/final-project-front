import React from "react"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

function DrawBetPage(props) {
	const matchId = props.match.params.matchId
	const leagueId = props.match.params.id

	const API_URL = process.env.REACT_APP_API_URL

	const [matchs, setMatchs] = useState([])
	const [loading, setLoading] = useState(true)
	const history = useHistory()
	const [coinsAmount, setCoinsAmount] = useState(0)
	const [userInLeague, setUserInLeague] = useState(0)
	const { user } = useContext(AuthContext)

	let drawCuote
	let namesMatch
	let homeTeam
	let awayTeam
	let nameTeams
	let userId = user._id

	useEffect(() => {
		axios.get(`https://api.b365api.com/v3/bet365/prematch?token=98735-GtE0VpaDW6UXg3&FI=${matchId}`).then((matchsApi) => {
			setMatchs(matchsApi.data)
			setLoading(false)

			let coinsInLeagueUser = {
				userId: userId,
				leagueId: leagueId,
			}

			axios.post(`${API_URL}/get-userinleague`, coinsInLeagueUser).then((userInLeague) => {
				setUserInLeague(userInLeague.data[0])
			})
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
		let coinsPotencials = coinsAmount * drawCuote
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
				coinsToWin: coinsPotencials,
				betSigne: "betDraw",
				leagueId: leagueId,
				matchId: matchId,
				userId: userId,
				coinsInLeague: coinsInLeagueUpdate,
			}

			//console.log(betInfo)

			axios
				.post(`${API_URL}/place-bet`, betInfo)

				.then(() => {
					history.push(`/`) //PONER LUEGO UN LINK A LA PAGINA DE CADA LIGA
				})
		}

		return (
			<div className="singleMatch">
				<h1>
					{homeTeam} vs {awayTeam}
				</h1>

				{/* <Card style={{ width: "18rem" }}> */}

				<h5>You are betting for: Draw</h5>

				<p>Coute: {drawCuote}</p>
				<form onSubmit={handleSubmitForm}>
					{/* <input hidden name="league._id" value={league._id}></input> */}
					<input type="number" name="coinsAmount" value={coinsAmount} onChange={handleCoinsAmountChange} placeholder="coins to bet" />
					<h6> Potencial winnings {coinsPotencials} </h6>
					{coinsInLeagueUpdate < 0 ? (
						<h1 className="red-text"> You don't have enought coins </h1>
					) : (
						<h1>
							{" "}
							<button type="submit">Bet in your League</button>{" "}
						</h1>
					)}
				</form>
			</div>
		)
	}
}

export default DrawBetPage
