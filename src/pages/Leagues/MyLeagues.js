import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import React from "react"
import axios from "axios"

function MyLeagues() {
	const API_URL = process.env.REACT_APP_API_URL
	const { user } = useContext(AuthContext)
	const [myLeagues, setMyLeagues] = useState([])

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
						</div>
					</>
				))}
			</div>
		</div>
	)
}

export default MyLeagues
