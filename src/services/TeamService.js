import axios from 'axios';

const TEAM_API_BASE_URL = "http://localhost:8082/api/teams";

class TeamService{
   
    getTeams() {
        return axios.get(TEAM_API_BASE_URL);
    }

    createTeam(team) {
       return axios.post(TEAM_API_BASE_URL, team);
    }
}

export default new TeamService()

