import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import React from "react"
import axios from "axios"

function AllLeagues() {
	const API_URL = process.env.REACT_APP_API_URL
	const [leagues, setLeagues] = useState([])

	const getAllLeagues = () => {
		axios
			.get(`${API_URL}/leagues`)

			.then((response) => setLeagues(response.data))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getAllLeagues()
	}, [])

	return (
		<div>
			<h1>Current Leagues</h1>
			{leagues.map((league) => (
				<>
					<h3>{league.name}</h3>
					<h5>Inscription Price:{league.inscriptionPrice}</h5>
					<h5>
						Participants: {league.participants.length} / {league.maxParticipants}
					</h5>
					<h5>Award: {league.pot}</h5>
				</>
			))}
		</div>
	)
}

export default AllLeagues
