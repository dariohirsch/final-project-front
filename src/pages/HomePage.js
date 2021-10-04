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
						<div id="carouselExampleCaptions" className="col-8 carousel slide" data-bs-ride="carousel">
							<div class="carousel-indicators">
								<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
								<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
								<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
							</div>
							<div class="carousel-inner">
								<div class="carousel-item active">
									<img src={betFriends} class="d-block w-100" alt="..." />
									<div class="carousel-caption d-none d-md-block">
										<h5>
											<b>Create leagues with your friends</b>
										</h5>
										<p>Some representative placeholder content for the first slide.</p>
									</div>
								</div>
								<div class="carousel-item">
									<img src={Virtual} class="d-block w-100" alt="..." />
									<div class="carousel-caption d-none d-md-block">
										<h5>
											<b>Play with real money or virtual coins</b>
										</h5>
										<p>Some representative placeholder content for the second slide.</p>
									</div>
								</div>
								<div class="carousel-item">
									<img src={PrivPub} class="d-block w-100" alt="..." />
									<div class="carousel-caption d-none d-md-block">
										<h5>
											<b>Join a private or public league</b>
										</h5>
										<p>Some representative placeholder content for the third slide.</p>
									</div>
								</div>
							</div>
							<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Previous</span>
							</button>
							<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Next</span>
							</button>
						</div>
						{/* <div className="col-8 cards-container">
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
						</div> */}
					</div>
				</>
			)}
		</div>
	)
}

export default HomePage
