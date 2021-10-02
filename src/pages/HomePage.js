import { useContext } from "react"
import { AuthContext } from "./../context/auth.context"
import betFriends from "./images/friends-bet.jpeg"

import { useHistory } from "react-router-dom"

function HomePage() {
	const { isLoggedIn } = useContext(AuthContext)
	const history = useHistory()
	return (
		<div>
			{isLoggedIn ? (
				<>
					<div className="container">
						<div className="row first-row">
							<div className="col-6 first-col">
								<button
									className="create-league-button"
									onClick={() => {
										history.push("/create-league")
									}}
								>
									CREATE A LEAGUE
								</button>
							</div>
							<div className="col-6 second-col">
								<button
									className="create-league-button"
									onClick={() => {
										history.push("/my-leagues")
									}}
								>
									MY LEAGUES
								</button>
							</div>
						</div>
						<div className="row second-row">
							<button
								className="create-league-button"
								onClick={() => {
									history.push("/all-leagues")
								}}
							>
								VIEW ALL LEAGUES
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="row">
						<div className="col-4">
							<div className="welcome-info">
								<h1 className="welcome-info-text">Welcome to the most exciting world of bets.</h1>
								<h5 className="welcome-info-text">Changing the way you bet. Create your own league with your friends. Join a public league.</h5>
								<button
									onClick={() => {
										history.push("/login")
									}}
									className="log-in-welcome"
								>
									LOG IN
								</button>
								<br />
								<button
									className="sign-up-welcome"
									onClick={() => {
										history.push("/signup")
									}}
								>
									SIGN UP
								</button>
							</div>
						</div>
						<div className="col-8 cards-container">
							<div className="row">
								<div className="home-card">
									<img src={betFriends} class="card-img-top" alt="..." />
									<div className="card-body">
										<p className="card-text">Create leagues with your friends</p>
									</div>
								</div>
								<div className="home-card">
									<img src={betFriends} class="card-img-top" alt="..." />
									<div class="card-body">
										<p className="card-text">Join public or private leagues</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="home-card">
									<img src={betFriends} class="card-img-top" alt="..." />
									<div class="card-body">
										<p class="card-text">All of your favorite competitions</p>
									</div>
								</div>
								<div className="home-card">
									<img src={betFriends} class="card-img-top" alt="..." />
									<div class="card-body">
										<p class="card-text">Play for real or with virtual coins</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default HomePage
