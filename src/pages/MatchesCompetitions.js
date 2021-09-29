import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"

function MatchesCompetitions(props) {
	const competitionId = props.match.params.id

	const [matches, setCompetition] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(`https://api.b365api.com/v1/bet365/upcoming?sport_id=1&token=98118-e5AVNY35CKcRQ3&league_id=${competitionId}`).then((response) => {
			let matchesList = response.data.results
			console.log(matchesList)
			setCompetition(matchesList)
			setLoading(false)
		})
	}, [])

	/*
  const oneMatch = matchs.find((match) => {
    return match.results.id === matchId;
  });

  */

	if (loading === true) {
		return <p>loading</p>
	} else {
		// console.log(cuota.results);
		return (
			<div>
				<h3> </h3>
				<div className="matcheslist" style={{ overflow: "scroll", maxHeight: "80vh" }}>
					{matches.map((match) => (
						<div key={match.name} className="card cardStyle">
							<Card border="primary" style={{ width: "18rem" }}>
								<Card.Body>
									<Card.Title>{match.league.name}: </Card.Title>
									<Card.Title>Partido: </Card.Title>
									<Card.Text>{match.home.name}</Card.Text>
									<Card.Text>{match.away.name}</Card.Text>
									<Card.Text>{match.id}</Card.Text>
									<Button href={`/competitions/matchodds/${match.id}`} variant="primary">
										Go odds details
									</Button>
								</Card.Body>
							</Card>
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default MatchesCompetitions
