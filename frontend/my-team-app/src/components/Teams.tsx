import React, { useEffect, useState } from "react";
import "../css/team-styles.css";
import axios from "axios";
import Title from "./Title";

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
  count: number;
  filters: {
    limit: number;
    offset: number;
    permission: string;
  };
  teams: Team[];
}

const Teams: React.FC = () => {
  const limit = 50;
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [teams, setTeams] = useState<Team[]>([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.REACT_APP_API_URL}/teamPagination/${limit}/${currentOffset}`
        );
  
        setTeams(response.data.teams);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[currentOffset]);

  const handlePreviousClick = () => {
    setCurrentOffset((prevOffset) => prevOffset - 50);
  };

  const handleNextClick = () => {
    setCurrentOffset((prevOffset) => prevOffset + 50);
  };

  return (
    <>
      <Title />
      <div className="grid-container">
        <button onClick={handlePreviousClick} disabled={currentOffset === 0}>
          Anterior
        </button>
        <button onClick={handleNextClick}>Siguiente</button>
      </div>
      <div className="grid-container">
        {teams.map((team) => (
          <div key={team.id} className="team">
            <h2>{team.name}</h2>
            <p>Short Name: {team.shortName}</p>
            <p>Tla: {team.tla}</p>
            <a href={`http://localhost:3000/TeamDetails/${team.id}`}>
              <img src={team.crest} alt={team.name} />
            </a>
            <p>Address: {team.address}</p>
            <p>
              Website: <a href={team.website}>{team.website}</a>
            </p>
            <p>Founded: {team.founded}</p>
            <p>Club Colors: {team.clubColors}</p>
            <p>Venue: {team.venue}</p>
          </div>
        ))}
      </div>
      <div className="grid-container">
        <button onClick={handlePreviousClick} disabled={currentOffset === 0}>
          Anterior
        </button>
        <button onClick={handleNextClick}>Siguiente</button>
      </div>
    </>
  );
};

export default Teams;
