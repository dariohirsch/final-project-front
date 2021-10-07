import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import React from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

function MyLeagues() {
	const API_URL = process.env.REACT_APP_API_URL
	const { user, userInLeague } = useContext(AuthContext)
	const [myLeagues, setMyLeagues] = useState([])

	const history = useHistory()

	const getMyLeagues = () => {
		let userId = user._id

		axios
			.post(`${API_URL}/my-leagues`, { userId })

			.then((response) => setMyLeagues(response.data.openLeagues))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getMyLeagues()
	}, [])

	const handleSubmitForm = (e) => {
		e.preventDefault()

		history.push(`/competitions/bet/${e.target[0].value}`)
	}
	const handleSubmitFormToDetails = (e) => {
		e.preventDefault()

		history.push(`/league/${e.target[0].value}`)
	}

	return (
		<div>
			<hr />
			<div className="leagues-container">
				{myLeagues.map((league) => (
					<>
						<div className="info-league-container">
							<h4>{league.name}</h4>
							<h5>
								Participants: {league.participants.length} / {league.maxParticipants}
							</h5>

							<h5>Pot: {league.participants.length * league.inscriptionPrice}</h5>
							<form onSubmit={handleSubmitFormToDetails}>
								<input hidden name="league._id" value={league._id}></input>
								<button className="bet-button enter-button" type="submit">
									<b>ENTER</b>
								</button>
							</form>

							{league.finishDate < new Date() / 1000 ? (
								<p className="red-text">League has finished.</p>
							) : (
								<form onSubmit={handleSubmitForm}>
									<input hidden name="league._id" value={league._id}></input>
									<button className="bet-button" type="submit">
										BET
									</button>
								</form>
							)}
							<p className="finish-date">Finish date: {new Date(league.finishDate * 1000).toLocaleString()}</p>
						</div>
					</>
				))}
			</div>
		</div>
	)
}

export default MyLeagues
