import { useEffect } from "react"

import React from "react"
import axios from "axios"

function LeagueDetails(props) {
	const API_URL = process.env.REACT_APP_API_URL
	// const [leagueInfo, setLeagueInfo] = useState()
	console.log(props)

	const leagueId = props.match.params.id

	useEffect(() => {
		getLeagueInfo()
	}, [])

	const getLeagueInfo = () => {
		axios.get(`${API_URL}/league-details/${leagueId}`)

		// .then((response) => setLeagueInfo(response.data))
		// .catch((error) => console.log(error))
	}

	return <div></div>
}

export default LeagueDetails
