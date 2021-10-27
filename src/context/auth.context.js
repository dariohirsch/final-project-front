import React, { useState, useEffect } from "react"
import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState(null)

	// const [userInLeague, setUserInLeague] = useState(null)

	const verifyStoredToken = () => {
		console.log("verifystoredtoken", user)
		// Get the stored token from the localStorage
		const storedToken = localStorage.getItem("authToken")

		// If the token exists in the localStorage
		if (storedToken) {
			// We must send the JWT token in the request's "Authorization" Headers
			axios
				.get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
				.then((response) => {
					// console.log("response", response)
					// If the server verifies that JWT token is valid  ✅
					// const user = response.data
					// setUser(user)
					setIsLoggedIn(true)
					setIsLoading(false)
				})
				.catch((error) => {
					// If the server sends an error response (invalid token) ❌
					setIsLoggedIn(false)

					setUser(null)
					setIsLoading(false)
				})
		} else {
			// If the token is not available
			setIsLoading(false)
		}
	}

	// setTimeOut(() => {const getUserInLeague = () => {
	// 	let userToSearch = user
	// 	console.log("usertosearch", userToSearch)
	// 	axios.post(`${API_URL}/get-userinleague`, { userToSearch }).then((response) => console.log(response))
	// },1000)

	const logInUser = (token) => {
		console.log("loginuser", token)
		localStorage.setItem("authToken", token.token)

		setUser(token.user)
		verifyStoredToken()

		/* 
		  After saving the token in the localStorage we call the
		  function `verifyStoredToken` which sends a new request to the
		  server to verify the token. Upon receiving the response the function 
		  `verifyStoredToken` updates the state variables `isLoggedIn`, `user` and `isLoading`
		*/
	}

	const logOutUser = () => {
		// Upon logout, remove the token from the localStorage
		localStorage.removeItem("authToken")

		// Update the state variables
		setIsLoggedIn(false)
		console.log("logout user")
		setUser(null)
	}

	useEffect(() => {
		verifyStoredToken()
	}, [])

	return <AuthContext.Provider value={{ isLoggedIn, isLoading, user, logInUser, logOutUser, setUser }}>{props.children}</AuthContext.Provider>
}

export { AuthProviderWrapper, AuthContext }
