import { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import React from "react"
import axios from "axios"

function AllLeagues() {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagues, setLeagues] = useState([])
	const { isLoggedIn, user, setUser } = useContext(AuthContext)
	const [accessCode, setAccessCode] = useState("")
	const history = useHistory()

	useEffect(() => {
		getAllLeagues()
	}, [])

	const getAllLeagues = () => {
		axios
			.get(`${API_URL}/leagues`)

			.then((response) => setLeagues(response.data))
			.catch((error) => console.log(error))
	}

	const handlesetAccessCodeChange = (e) => {
		setAccessCode(e.target.value)
	}

	const handleSubmitForm = (e) => {
		e.preventDefault()

		let joinLeagueInfo = {
			userId: user._id,
			leagueId: e.target[1].value,
			coinsUpdated: user.coins - e.target[2].value,
		}

		axios
			.post(`${API_URL}/join-league`, joinLeagueInfo)

			.then(() => {
				setUser({ ...user, coins: user.coins - e.target[2].value })

				history.push(`/league/${e.target[1].value}`) //PONER LUEGO UN LINK A LA PAGINA DE CADA LIGA
			})
	}

	return (
		<div>
			<hr />
			<div className="leagues-container">
				{leagues.map((league) => (
					<>
						<div className="info-league-container">
							<h4>{league.name}</h4>

							<h5>Inscription cost: {league.inscriptionPrice}</h5>

							<h5>
								Participants: {league.participants.length} / {league.maxParticipants}
								{/* {league.participants.length === league.maxParticipants ? <p>League is full. Try another one!</p> : <p></p>} */}
							</h5>
							<h5>Award: {league.participants.length * league.inscriptionPrice}</h5>
							{league.accessCode !== "" ? <p>Private league</p> : <p></p>}
							{league.finishDate < new Date() / 1000 ? (
								<p className="red-text">
									<b>League has finished. Try another one!</b>
								</p>
							) : user.coins < league.inscriptionPrice ? (
								<p className="red-text">
									<b>You don't have enough money</b>
								</p>
							) : isLoggedIn && league.participants.length !== league.maxParticipants ? (
								<form onSubmit={handleSubmitForm}>
									<input hidden name="user._id" value={user._id}></input>
									<input hidden name="league._id" value={league._id}></input>
									<input hidden name="inscriptionPrice" value={league.inscriptionPrice}></input>
									<input hidden name="leagueName" value={league.name}></input>

									{league.participants?.includes(user._id) ? (
										<button
											type="submit"
											onClick={() => {
												history.push(`/league/${league._id}`)
											}}
											className="join-league-button"
										>
											Enter
										</button>
									) : (
										<>
											{league.accessCode !== "" && league.accessCode !== accessCode ? <input type="text" className="join-league-button2 accesCode" name="accessCode" value={accessCode} onChange={handlesetAccessCodeChange} placeholder=" " /> : <p></p>}

											{league.accessCode !== "" && league.accessCode !== accessCode ? (
												<p>Incorrect access code</p>
											) : (
												<button type="submit" className="join-league-button">
													Join League
												</button>
											)}
										</>
									)}
									<p className="finish-date">Finish date: {new Date(league.finishDate * 1000).toLocaleString()}</p>
								</form>
							) : league.participants.length === league.maxParticipants ? (
								<p className="red-text">
									<b>League is full. Try another one!</b>
								</p>
							) : (
								<p className="red-text">
									To join a league, please <Link to="/login">log in</Link> or <Link to="signup">sign up </Link>
								</p>
							)}
						</div>
					</>
				))}
			</div>
		</div>
	)
}

export default AllLeagues
