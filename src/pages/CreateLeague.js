import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./../context/auth.context"
import React from "react"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"

function CreateLeague() {
	const { isLoggedIn } = useContext(AuthContext)
	const [name, setName] = useState("")
	const [inscriptionPrice, setInscriptionPrice] = useState("")
	const [maxParticipants, setmaxParticipants] = useState("")
	const [accessCode, setAccessCode] = useState("")
	const [participants, setParticipants] = useState("")
	const [pot, setPot] = useState("")

	const history = useHistory()

	const handleNameLineChange = (e) => {
		setName(e.target.value)
	}

	const handleInscriptionPrice = (e) => {
		setInscriptionPrice(e.target.value)
	}

	const handlemaxParticipantsChange = (e) => {
		setmaxParticipants(e.target.value)
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

	const handleSubmit = (e) => {
		e.preventDefault()

		let objectToSubmit = {
			name: name,
			inscriptionPrice: inscriptionPrice,
			maxParticipants: maxParticipants,
			accessCode: accessCode,
			participants: participants,
			pot: pot,
		}

		console.log(objectToSubmit)

		axios.post(URL, objectToSubmit).then(() => {
			setName("")
			setInscriptionPrice("")
			setmaxParticipants("")
			setAccessCode("")
			setParticipants("")
			setPot("")

			history.push("/")
		})
	}

	return (
		<div>
			{isLoggedIn ? (
				<div className="AddApartmentPage">
					<h3>Add New Beer</h3>
					<form onSubmit={handleSubmit}>
						<input type="text" name="name" value={name} onChange={handleNameLineChange} placeholder=" league name" />
						<input type="number" name="inscriptionPrice" value={inscriptionPrice} onChange={handleInscriptionPrice} placeholder=" inscription price" />
						<input type="number" name="maxParticipants" value={maxParticipants} onChange={handlemaxParticipantsChange} placeholder="max participants" />
						<input type="text" name="accessCode" value={accessCode} onChange={handlesetAccessCodeChange} placeholder=" access code (optional)" />
						<input type="text" hidden name="participants" value={participants} onChange={handlesetParticipantsChange} />
						<input type="number" hidden name="pot" value={pot} onChange={handlepotChange} />

						<button type="submit">SUBMIT</button>
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
