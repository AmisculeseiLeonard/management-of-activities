import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8082/api/employees";

class EmployeeService{

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    getUpperManagementEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/upperManagement' );
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    getTeams(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/teams');
    }

}

export default new EmployeeService()