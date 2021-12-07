import axios from 'axios';
const BUILD_PRIORITY_API_BASE_URL = "http://localhost:8082/api/buildPriorities";

class BuildPriority{

    getBuildPriorities() {
        return axios.get(BUILD_PRIORITY_API_BASE_URL);
    }
}

export default new BuildPriority();