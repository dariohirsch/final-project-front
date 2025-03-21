import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import React from "react"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"

function CreateLeague() {
	const { isLoggedIn } = useContext(AuthContext)
	const [name, setName] = useState("")
	const [inscriptionPrice, setInscriptionPrice] = useState("")
	const [maxParticipants, setMaxParticipants] = useState("")
	const [accessCode, setAccessCode] = useState("")
	const [participants, setParticipants] = useState("")
	const [pot, setPot] = useState(0)
	const [potToWinners, setPotToWinners] = useState(0)
	const [condition, setCondition] = useState("open")
	const [finishDate, setFinishDate] = useState("")

	const API_URL = process.env.REACT_APP_API_URL

	const history = useHistory()

	const handleNameLineChange = (e) => {
		setName(e.target.value)
	}

	const handleInscriptionPrice = (e) => {
		setInscriptionPrice(e.target.value)
	}

	const handlemaxParticipantsChange = (e) => {
		setMaxParticipants(e.target.value)
	}

	const handlesetAccessCodeChange = (e) => {
		setAccessCode(e.target.value)
	}

	const handlesetParticipantsChange = (e) => {
		setParticipants(e.target.value)
	}

	const handlepotChange = (e) => {
		setPot(e.target.value)
	}

	const handleConditionChange = (e) => {
		setPot(e.target.value)
	}

	const handlepotToWinersChange = (e) => {
		setPotToWinners(e.target.value)
	}

	// const handleFinishDate = (e) => {
	const actualDateEpoch = new Date() / 1000
	// 	setFinishDate(e.target.value)
	// 	// setFinishDate(e.target.value * 86400 + actualDateEpoch)
	// }

	const handleFinishDate = (e) => {
		setFinishDate(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		let newLeague = {
			name: name,
			inscriptionPrice: inscriptionPrice,
			maxParticipants: maxParticipants,
			accessCode: accessCode,
			participants: participants,
			pot: pot,
			condition: condition,
			potToWinners: potToWinners,
			finishDate: parseInt(finishDate) * 86400 + actualDateEpoch,
		}

		axios.post(`${API_URL}/newleague`, newLeague).then(() => {
			setName("")
			setInscriptionPrice("")
			setMaxParticipants("")
			setAccessCode("")
			setParticipants("")
			setPot(0)
			setCondition("open")
			setFinishDate("")

			history.push("/all-leagues")
		})
	}

	return (
		<div>
			{isLoggedIn ? (
				<div className="AddApartmentPage">
					<hr />
					<h3>CREATE LEAGUE</h3>
					<form className="form-create-league" onSubmit={handleSubmit}>
						<input className="create-league-input" type="text" name="name" value={name} onChange={handleNameLineChange} placeholder=" league name" />
						<input className="create-league-input" type="number" name="inscriptionPrice" value={inscriptionPrice} onChange={handleInscriptionPrice} placeholder=" inscription cost" />
						<input className="create-league-input" type="number" name="maxParticipants" value={maxParticipants} onChange={handlemaxParticipantsChange} placeholder="max participants" />

						<input className="create-league-input" type="number" name="finishDate" value={finishDate} onChange={handleFinishDate} placeholder="duration (days)" />
						{/* <input type="number" hidden name="duration" value={finishDateInput} onChange={handleFinishDate} placeholder="duration (days)" /> */}

						<input className="create-league-input" type="text" name="accessCode" value={accessCode} onChange={handlesetAccessCodeChange} placeholder=" access code (optional)" />
						<select id="potToWinners" name="potToWinners" onChange={handlepotToWinersChange}>
							<option value="allWinners">First wins all</option>
							<option value="first-second-third">First second and third</option>
							<option value="half">First half participants</option>
						</select>
						<input type="text" hidden name="participants" value={participants} onChange={handlesetParticipantsChange} />
						<input type="number" hidden name="pot" value={pot} onChange={handlepotChange} />
						<input type="number" hidden name="condition" value={condition} onChange={handleConditionChange} />

						<button className="bet-button" type="submit">
							CREATE
						</button>
					</form>
				</div>
			) : (
				<h4>
					To create a league, please <Link to="/login">log in</Link> or <Link to="/signup ">sign up </Link>
				</h4>
			)}
		</div>
	)
}

export default CreateLeague
