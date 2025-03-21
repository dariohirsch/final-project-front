import { useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "./../context/auth.context"
import BetResults from "./BetPages/BetResultsPage"
import LeagueResults from "./Leagues/LeagueResultsPage"
import { Divider } from "react"

const API_URL = process.env.REACT_APP_API_URL

function LoginPage(props) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState(undefined)

	const { logInUser } = useContext(AuthContext)

	const handleEmail = (e) => setEmail(e.target.value)
	const handlePassword = (e) => setPassword(e.target.value)

	const handleLoginSubmit = (e) => {
		e.preventDefault()
		const requestBody = { email, password }

		axios
			.post(`${API_URL}/auth/login`, requestBody)
			.then((response) => {
				console.log("JWT token", response.data.authToken)

				const token = response.data.authToken
				const user = response.data.user
				logInUser({ token: token, user: user })
				props.history.push("/")
			})
			.catch((error) => {
				const errorDescription = error.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	return (
		<div className="LoginPage">
			<BetResults />
			<LeagueResults />
			<hr className="divisor" />
			<h1>LOGIN</h1>

			<form onSubmit={handleLoginSubmit}>
				<label>Email</label>
				<input type="text" name="email" value={email} onChange={handleEmail} />

				<label>Password</label>
				<input type="password" name="password" value={password} onChange={handlePassword} />

				<button type="submit" className="button-log-sign">
					Login
				</button>
			</form>
			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Don't have an account yet?</p>
			<Link to={"/signup"}> Sign Up</Link>
		</div>
	)
}

export default LoginPage
