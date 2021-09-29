import { useContext } from "react"
import { AuthContext } from "./../context/auth.context"

function HomePage() {
	const { isLoggedIn } = useContext(AuthContext)

	return (
		<div>
			{isLoggedIn ? (
				<div>
					<h1>CREA TU LIGA</h1>
					<h1>VER TUS LIGAS</h1>
				</div>
			) : (
				<h1>HACER PRESENTACION DE LA APP Y PONER LINK A LOGIN Y SIGNUP</h1>
			)}
		</div>
	)
}

export default HomePage
