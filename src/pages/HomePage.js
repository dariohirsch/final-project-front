import { useContext } from "react"
import { AuthContext } from "./../context/auth.context"
import betFriends from "./images/friends-bet.jpeg"
import PrivPub from "./images/pub-priv.jpeg"
import Virtual from "./images/real-virtual.jpeg"

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
					{" "}
					<div className="container home-page-cont">
						<div className="col-4">
							<div className="welcome-info">
								<h1 className="welcome-info-text">Welcome to the most exciting world of bets</h1>
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
						<div id="carouselExampleCaptions" className="col-8 carousel slide" data-bs-ride="carousel">
							<div className="carousel-indicators">
								<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
								<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
								<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
							</div>
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img src={betFriends} className="d-block w-100" alt="..." />
									<div className="carousel-caption d-none d-md-block">
										<h5>
											<b>Create leagues with your friends</b>
										</h5>
										<p>Beting with friends makes matches more exciting!</p>
									</div>
								</div>
								<div className="carousel-item">
									<img src={Virtual} className="d-block w-100" alt="..." />
									<div className="carousel-caption d-none d-md-block">
										<h5>
											<b>Play with real money or virtual coins</b>
										</h5>
										<p>Everyone can feel the emotion of beting!</p>
									</div>
								</div>
								<div className="carousel-item">
									<img src={PrivPub} className="d-block w-100" alt="..." />
									<div className="carousel-caption d-none d-md-block">
										<h5>
											<b>Join a private or public league</b>
										</h5>
										<p>Play with random people around the world!</p>
									</div>
								</div>
							</div>
							<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
								<span className="carousel-control-prev-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Previous</span>
							</button>
							<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
								<span className="carousel-control-next-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default HomePage
