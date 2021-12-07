import axios from 'axios';

const TASK_TYPE_API_BASE_URL = "http://localhost:8082/api/task-types";

class TaskTypeService{
   
    getTaskTypes() {
        return axios.get(TASK_TYPE_API_BASE_URL);
    }

}

export default new TaskTypeService()