import { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import React from "react"
import axios from "axios"

function AllLeagues() {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagues, setLeagues] = useState([])
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
	const [userId, setUserId] = useState("")
	const [leagueId, setLeagueId] = useState()
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
		console.log(e.target[1].value)
		e.preventDefault()

		let joinLeagueInfo = {
			userId: user._id,
			leagueId: e.target[1].value,
		}

		axios
			.post(`${API_URL}/join-league`, joinLeagueInfo)

			.then(() => {
				history.push("/") //PONER LUEGO UN LINK A LA PAGINA DE CADA LIGA
			})
	}

	return (
		<div>
			<h1>Current Leagues</h1>
			<div className="leagues-container">
				{leagues.map((league) => (
					<>
						<div className="info-league-container">
							<h3>{league.name}</h3>

							<h5>Inscription Price:{league.inscriptionPrice}</h5>
							<h5>
								Participants: {league.participants.length} / {league.maxParticipants}
								{/* {league.participants.length === league.maxParticipants ? <p>League is full. Try another one!</p> : <p></p>} */}
							</h5>
							<h5>Award: {league.pot}</h5>
							{user.coins < league.inscriptionPrice ? (
								<p className="red-text">You don't have enaugth coins</p>
							) : isLoggedIn && league.participants.length !== league.maxParticipants ? (
								<form onSubmit={handleSubmitForm}>
									<input hidden name="user._id" value={user._id}></input>
									<input hidden name="league._id" value={league._id}></input>
									<button type="submit">Join League</button>
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
