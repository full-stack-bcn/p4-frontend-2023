import React, { useEffect, useState } from "react";
import "../css/team-styles.css";
import axios from "axios";
import TeamDetails from "./TeamDetails";


interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

interface ApiResponse {
  partners: {
    count: number;
    filters: {
      limit: number;
      offset: number;
      permission: string;
    };
    teams: Team[];
  };
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          process.env.REACT_APP_API_URL + "/team"
        );
        setTeams(response.data.partners.teams);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    const handleTeamClick = (teamId: number) => {
      setSelectedTeamId(teamId);
    }

    return (
      <div className="grid-container">
        {teams.map((team) => (
          <div
            key={team.id}
            className="team"
            onClick={() => handleTeamClick(team.id)}
            style={{ cursor: "pointer" }}
          >
            <h2>{team.name}</h2>
            <p>Short Name: {team.shortName}</p>
            <p>Tla: {team.tla}</p>
            <img src={team.crest} alt={team.name} />
            <p>Address: {team.address}</p>
            <p>
              Website: <a href={team.website}>{team.website}</a>
            </p>
            <p>Founded: {team.founded}</p>
            <p>Club Colors: {team.clubColors}</p>
            <p>Venue: {team.venue}</p>
          </div>
        ))}
        {selectedTeamId && <TeamDetails teamId={selectedTeamId} />}
      </div>
    );
  };

  export default Teams;
