import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/team-details-style.css";
import "../css/team-styles.css";
import Title from "./Title";
import { useParams } from "react-router-dom";

type Team = {
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
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
  runningCompetitions: Competition[];
  coach: Coach;
  squad: Player[];
  staff: StaffMember[];
  lastUpdated: string;
};

type Competition = {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
};

type Coach = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: {
    start: string;
    until: string;
  };
};

type Player = {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
};

type StaffMember = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: {
    start: string;
    until: string;
  };
};

const TeamDetails: React.FC = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get<Team>(
          `${process.env.REACT_APP_API_URL}/teams/${teamId}/`
        );
        setTeam(response.data);
      } catch (error) {
        setError(
          "An error has occurred while trying to retrieve the data for your selected team. Please select a new team or try again later."
        );
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (error) {
    return (
      <>
        <Title />
        <div className="team-details-container">
          <div className="team-details-header team-card">{error}</div>
        </div>
      </>
    );
  }

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title />
      <div className="team-details-container">
        <div className="team-details-header team-card">
          <h1>{team.name}</h1>
          <div className="team-details-image ">
            <img src={team.crest} alt={team.name} />
          </div>
        </div>
      </div>
      <div className="team-details-container">
        <div className="team-details-main">
          <div className="team-details-info team-card">
            <h2>Team Details:</h2>
            <p>Short Name: {team.shortName}</p>
            <p>Tla: {team.tla}</p>
            <p>Address: {team.address}</p>
            <p>
              Website: <a href={team.website}>{team.website}</a>
            </p>
            <p>Founded: {team.founded}</p>
            <p>Club Colors: {team.clubColors}</p>
            <p>Venue: {team.venue}</p>
          </div>
          <div className="team-details-competitions team-card">
            <h2>Competitions:</h2>
            <ul>
              {team.runningCompetitions.map((competition) => (
                <li key={competition.id}>
                  <div className="competitions">
                    <div className="data-competitions">
                      <h2>{competition.name}</h2>
                      <h2>Type: {competition.type}</h2>
                    </div>
                    <div>
                      <img src={competition.emblem} alt={competition.name} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="team-details-coach">
          <div className="team-details-coach team-card">
            <h2>Coach: {team.coach.name}</h2>
            <p>First Name: {team.coach.firstName}</p>
            <p>Last Name: {team.coach.lastName}</p>
            <p>Date of Birth: {team.coach.dateOfBirth}</p>
            <p>Nationality: {team.coach.nationality}</p>
            <p>Contract Start: {team.coach.contract.start}</p>
            <p>Contract Until: {team.coach.contract.until}</p>
          </div>
        </div>
      </div>
      <div className="team-details-container">
        <div className="team-details-staff team-card">
          <h2>Squad:</h2>
          <ul>
            {team.squad.map((player) => (
              <li key={player.id}>
                <div className="player-details">
                  <h3>{player.name}</h3>
                  <p>Position: {player.position}</p>
                  <p>Date of Birth: {player.dateOfBirth}</p>
                  <p>Nationality: {player.nationality}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="team-details-staff team-card">
          <h2>Staff:</h2>
          <ul>
            {team.staff.map((staffMember) => (
              <li key={staffMember.id}>
                {staffMember.name} - {staffMember.nationality}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TeamDetails;
