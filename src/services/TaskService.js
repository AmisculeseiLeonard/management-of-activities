import axios from 'axios';

const TASK_API_BASE_URL = "http://localhost:8082/api/tasks";

class TaskService{

    getTasks() {
        return axios.get(TASK_API_BASE_URL);
    }

    createTask(project) {
        return axios.post(TASK_API_BASE_URL, project);
    }

    getTaskById(projectId){
        return axios.get(TASK_API_BASE_URL + '/' + projectId);
    }

    updateTask(project, projectId) {
        return axios.put(TASK_API_BASE_URL + '/' + projectId, project);
    }

    deleteTask(projectId) {
        return axios.delete(TASK_API_BASE_URL + '/' + projectId);
    }

}

export default new TaskService()