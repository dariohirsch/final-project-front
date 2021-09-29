import "./App.css"
import { Switch, Route } from "react-router-dom"
import Navigation from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProjectListPage from "./pages/ProjectListPage"
import CompetitionsPage from "./pages/CompetitionsPage"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"
import EditProjectPage from "./pages/EditProjectPage"

import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import PrivateRoute from "./components/PrivateRoute" // <== IMPORT
import AnonRoute from "./components/AnonRoute" // <== IMPORT
import { Container } from "react-bootstrap"

function App() {
	return (
		<div className="App">
			<Navigation />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage} />

					{/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
					<PrivateRoute exact path="/competitions" component={CompetitionsPage} />
					<PrivateRoute exact path="/projects/:id" component={ProjectDetailsPage} />
					<PrivateRoute exact path="/projects/edit/:id" component={EditProjectPage} />

					<AnonRoute exact path="/signup" component={SignupPage} />
					<AnonRoute exact path="/login" component={LoginPage} />
				</Switch>
			</Container>
		</div>
	)
}

export default App
