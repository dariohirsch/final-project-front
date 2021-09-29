import { useContext } from "react" // <== IMPORT
import { AuthContext } from "./../context/auth.context" // <== IMPORT
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function Navigation() {
	// Subscribe to the AuthContext to gain access to
	// the values from AuthContext.Provider `value` prop
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			{console.log(user)}
			<Container>
				<Navbar.Brand href="/">BetFriends</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/competitions">Upcoming matches</Nav.Link>
					<NavDropdown title="Leagues" id="collasible-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">View all leagues</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">My leagues</NavDropdown.Item>
						<NavDropdown.Item href="/create-league">Create new league</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				{isLoggedIn ? (
					<>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						{/* <Navbar.Collapse id="responsive-navbar-nav"> */}
						<Button onClick={logOutUser}>Logout</Button>
						<span>{user?.name}</span>
						<span>Coins: {user?.coins}</span>
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
