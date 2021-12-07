import axios from 'axios';

const SEVERITY_API_BASE_URL = "http://localhost:8082/api/severity";

class SeverityService {
    getSeverity(){
        return axios.get(SEVERITY_API_BASE_URL);
    }

}

export default new SeverityService()