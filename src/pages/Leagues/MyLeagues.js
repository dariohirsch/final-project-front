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

	console.log("user in league", userInLeague)

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

	return (
		<div>
			<div className="leagues-container">
				{myLeagues.map((league) => (
					<>
						<div className="info-league-container">
							<h2>{league.name}</h2>
							<h4>
								Participants: {league.participants.length} / {league.maxParticipants}
							</h4>

							<h4>Pot: {league.participants.length * league.inscriptionPrice}</h4>
							<form onSubmit={handleSubmitForm}>
								<input hidden name="league._id" value={league._id}></input>
								<button className="bet-button" type="submit">
									BET
								</button>
							</form>
						</div>
					</>
				))}
			</div>
		</div>
	)
}

export default MyLeagues
