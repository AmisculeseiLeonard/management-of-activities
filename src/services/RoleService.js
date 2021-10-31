import axios from 'axios';

const ROLE_API_BASE_URL = "http://localhost:8082/api/roles";

class RoleService{

    getRoles() {
        return axios.get(ROLE_API_BASE_URL);
    }

}

export default new RoleService()