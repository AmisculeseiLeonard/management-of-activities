import axios from 'axios';

const TEAM_API_BASE_URL = "http://localhost:8082/api/teams";

class TeamService{
   
    getTeams() {
        return axios.get(TEAM_API_BASE_URL);
    }

    createTeam(team) {
       return axios.post(TEAM_API_BASE_URL, team);
    }

    updateTeam(team, teamId){
        return axios.put(TEAM_API_BASE_URL + '/' + teamId, team)
    }

    deleteTeam(teamId) {
        return axios.delete(TEAM_API_BASE_URL + '/' + teamId)
    }
        
}

export default new TeamService()

