import { useContext } from "react" // <== IMPORT
import { AuthContext } from "./../context/auth.context" // <== IMPORT
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useHistory } from "react-router-dom"

function Navigation() {
	// Subscribe to the AuthContext to gain access to
	// the values from AuthContext.Provider `value` prop
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
	const history = useHistory()

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			{console.log(user)}
			<Container>
				<Nav.Link
					className="nav-buttons"
					onClick={() => {
						history.push("/")
					}}
				>
					BetFriends
				</Nav.Link>
				<Nav className="me-auto">
					<Nav.Link
						className="nav-buttons"
						onClick={() => {
							history.push("/competitions")
						}}
					>
						Upcoming matches
					</Nav.Link>
					<NavDropdown className="nav-buttons" title="Leagues" id="collasible-nav-dropdown">
						<NavDropdown.Item
							onClick={() => {
								history.push("/all-leagues")
							}}
						>
							View all leagues
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								history.push("/my-leagues")
							}}
						>
							My leagues
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								history.push("/create-league")
							}}
						>
							Create new league
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				{isLoggedIn ? (
					<>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						{/* <Navbar.Collapse id="responsive-navbar-nav"> */}
						<span className="nav-text">Welcome {user?.name}</span>
						<span className="nav-text">Coins {user?.coins}</span>
						<button className="log-out" onClick={logOutUser} href="/">
							Logout
						</button>

						{/* </Navbar.Collapse> */}
					</>
				) : (
					<>
						<Nav>
							<Nav.Link href="/login">Log In</Nav.Link>
							<Nav.Link href="/signup">Sign Up</Nav.Link>
						</Nav>
					</>
				)}
			</Container>
		</Navbar>
	)
}

export default Navigation
