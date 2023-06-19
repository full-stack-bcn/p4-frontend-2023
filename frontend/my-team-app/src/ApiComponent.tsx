import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const ApiComponent: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("entre");
        const response = await axios.get<ApiResponse>(
            process.env.REACT_APP_API_URL + '/team' // Reemplaza con la URL de tu API
        );
        setTeams(response.data.partners.teams);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {teams.map((team) => (
        <div key={team.id}>
          <h2>{team.name}</h2>
          <p>Short Name: {team.shortName}</p>
          <p>Tla: {team.tla}</p>
          <img src={team.crest} alt={team.name} />
          <p>Address: {team.address}</p>
          <p>Website: <a href={team.website}>{team.website}</a></p>
          <p>Founded: {team.founded}</p>
          <p>Club Colors: {team.clubColors}</p>
          <p>Venue: {team.venue}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiComponent;
