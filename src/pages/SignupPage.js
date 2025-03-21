import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

function SignupPage(props) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [coins, setCoins] = useState(1000)
	const [openLeagues, setOpenLeagues] = useState("")
	const [errorMessage, setErrorMessage] = useState(undefined)

	const handleEmail = (e) => setEmail(e.target.value)
	const handlePassword = (e) => setPassword(e.target.value)
	const handleName = (e) => setName(e.target.value)
	const handleCoins = (e) => setCoins(e.target.value)
	const handleOpenLeagues = (e) => setOpenLeagues(e.target.value)

	const handleSignupSubmit = (e) => {
		e.preventDefault()
		// Create an object representing the request body
		const requestBody = { email, password, name, coins, openLeagues }
		axios
			.post(`${API_URL}/auth/signup`, requestBody)
			.then((response) => props.history.push("/login"))

			.catch((error) => {
				const errorDescription = error.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	return (
		<div className="SignupPage">
			<hr className="divisor" />
			<h1>SIGN UP</h1>

			<form onSubmit={handleSignupSubmit}>
				<label>Email</label>
				<input type="text" name="email" value={email} onChange={handleEmail} />

				<label>Password</label>
				<input type="password" name="password" value={password} onChange={handlePassword} />

				<label>Name</label>
				<input type="text" name="name" value={name} onChange={handleName} />
				<input type="number" hidden name="coins" value={1000} onChange={handleCoins} />

				<button type="submit" class="button-log-sign">
					Sign Up
				</button>
			</form>

			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Already have account?</p>
			<Link to={"/login"}> Login</Link>
		</div>
	)
}

export default SignupPage
