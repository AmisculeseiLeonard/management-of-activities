import axios from 'axios';

const TASK_STATUS_API_BASE_URL = "http://localhost:8082/api/task-statuses";

class TaskStatusService{
   
    getTaskStatuses() {
        return axios.get(TASK_STATUS_API_BASE_URL);
    }
       
}

export default new TaskStatusService()