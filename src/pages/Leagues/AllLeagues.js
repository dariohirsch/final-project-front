import { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import React from "react"
import axios from "axios"

function AllLeagues() {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagues, setLeagues] = useState([])
	const { isLoggedIn, user, setUser } = useContext(AuthContext)

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

	const handleSubmitForm = (e) => {
		// console.log(e.target[2].value)
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

	console.log("actual date", new Date() / 1000)

	return (
		<div>
			<h1>Current Leagues</h1>
			<div className="leagues-container">
				{leagues.map((league) => (
					<>
						<div className="info-league-container">
							<h3>{league.name}</h3>

							<h5>Inscription cost:{league.inscriptionPrice}</h5>

							<h5>
								Participants: {league.participants.length} / {league.maxParticipants}
								{/* {league.participants.length === league.maxParticipants ? <p>League is full. Try another one!</p> : <p></p>} */}
							</h5>
							<h5>Award: {league.participants.length * league.inscriptionPrice}</h5>

							{league.finishDate < new Date() / 1000 ? (
								<p className="red-text">League has finished. Try another one!</p>
							) : user.coins < league.inscriptionPrice ? (
								<p className="red-text">You don't have enough coins</p>
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
											<button type="submit" className="join-league-button">
												Join League
											</button>
										</>
									)}
									<p>Finish date: {new Date(league.finishDate * 1000).toLocaleString()}</p>
								</form>
							) : league.participants.length === league.maxParticipants ? (
								<p className="red-text">League is full. Try another one!</p>
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
