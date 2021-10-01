import React from "react"
import { Link } from "react-router-dom"
import league1 from "./assets/league1.jpeg"
import laliga from "./assets/laliga.jpeg"
import seriea from "./assets/calcio.jpeg"
import premier from "./assets/premier.jpeg"
import bundesleague from "./assets/bundesliga.jpeg"

function CompetitionsBet(props) {
	const leagueId = props.match.params.id
	// console.log("leagueID??????", leagueId)

	let franceId = 10041100
	let spainId = 10041110
	let italyId = 10041315
	let englandId = 10041282
	let germanyId = 10041095

	return (
		<>
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
