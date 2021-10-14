import React from "react"
import { Link } from "react-router-dom"
import league1 from "./assets/league1.jpeg"
import laliga from "./assets/laliga.jpeg"
import seriea from "./assets/calcio.jpeg"
import premier from "./assets/premier.jpeg"
import bundesleague from "./assets/bundesliga.jpeg"
import { Nav, Navbar, Container } from "react-bootstrap"
import axios from "axios"
import { useEffect, useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { useHistory } from "react-router-dom"

function CompetitionsBet(props) {
	const leagueId = props.match.params.id
	const { user } = useContext(AuthContext)
	const [userInLeague, setUserInLeague] = useState(0)
	const [userLeague, setUserLeague] = useState("")
	const API_URL = process.env.REACT_APP_API_URL
	const history = useHistory()

	let franceId = 10041100
	let spainId = 10041110
	let italyId = 10041315
	let englandId = 10041282
	let germanyId = 10041095
	let userId = user._id

	useEffect(() => {
		let coinsInLeagueUser = {
			userId: userId,
			leagueId: leagueId,
		}

		axios.post(`${API_URL}/get-userleague`, coinsInLeagueUser).then((userLeague) => {
			setUserLeague(userLeague.data[0])
		})

		axios.post(`${API_URL}/get-userinleague`, coinsInLeagueUser).then((userInLeague) => {
			setUserInLeague(userInLeague.data[0])
		})
	}, [])

	return (
		<>
			<Navbar bg="" className="sub-navbar" variant="dark" expand="lg">
				<Container>
					<Nav className="me-auto">
						<Nav.Link
							className="navInLeague2"
							onClick={() => {
								history.push(`/league/${leagueId}`)
							}}
						>
							Home
						</Nav.Link>
						<Nav.Link
							className="navInLeague2"
							onClick={() => {
								history.push(`/my-bets/${leagueId}`)
							}}
						>
							My bets
						</Nav.Link>
						<Nav.Link
							className="navInLeague2"
							onClick={() => {
								history.push(`/competitions/bet/${leagueId}`)
							}}
						>
							Bet
						</Nav.Link>
					</Nav>
					<Nav className="nav-text-right">
						<Nav className="nav-text-right"> Coins {userInLeague.coinsInLeague}</Nav>
						<Nav className="nav-text-right"> {userLeague.name}</Nav>
					</Nav>
				</Container>
			</Navbar>
			<div className=" competitionsContainer">
				<Link to={`/competitions/bet/${leagueId}/${franceId}`}>
					<img ClassName="fotosLigas" src={league1} alt="league1"></img>
				</Link>

				<Link to={`/competitions/bet/${leagueId}/${spainId}`}>
					<img ClassName="fotosLigas" src={laliga} alt="laLiga"></img>
				</Link>

				<Link to={`/competitions/bet/${leagueId}/${italyId}`}>
					<img ClassName="fotosLigas" src={seriea} alt="seriaA"></img>
				</Link>

				<Link to={`/competitions/bet/${leagueId}/${englandId}`}>
					<img ClassName="fotosLigas" src={premier} alt="premier-league"></img>
				</Link>

				<Link to={`/competitions/bet/${leagueId}/${germanyId}`}>
					<img ClassName="fotosLigas" src={bundesleague} alt="bundensliga"></img>
				</Link>
			</div>
		</>
	)
}

export default CompetitionsBet
