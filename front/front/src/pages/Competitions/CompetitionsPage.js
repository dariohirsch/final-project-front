import React from "react"
import { Link } from "react-router-dom"
import league1 from "./assets/league1.jpeg"
import laliga from "./assets/laliga.jpeg"
import seriea from "./assets/calcio.jpeg"
import premier from "./assets/premier.jpeg"
import bundesleague from "./assets/bundesliga.jpeg"

function CompetitionsPage() {
	let franceId = 10041100
	let spainId = 10041110
	let italyId = 10041315
	let englandId = 10041282
	let germanyId = 10041095

	return (
		<>
			<div className=" competitionsContainer">
				<Link to={`/competitions/${franceId}`}>
					<img ClassName="fotosLigas" src={league1} alt="league1"></img>
				</Link>

				<Link to={`/competitions/${spainId}`}>
					<img ClassName="fotosLigas" src={laliga} alt="laLiga"></img>
				</Link>

				<Link to={`/competitions/${italyId}`}>
					<img ClassName="fotosLigas" src={seriea} alt="seriaA"></img>
				</Link>

				<Link to={`/competitions/${englandId}`}>
					<img ClassName="fotosLigas" src={premier} alt="premier-league"></img>
				</Link>

				<Link to={`/competitions/${germanyId}`}>
					<img ClassName="fotosLigas" src={bundesleague} alt="bundensliga"></img>
				</Link>
			</div>
		</>
	)
}

export default CompetitionsPage
