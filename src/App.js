import ListEmployeeComponent from "./components/ListEmployeeComponent";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import CreateTeamComponent from "./components/CreateTeamComponent";
import ListTeamComponent from "./components/ListTeamComponent";
import UpdateTeamComponent from "./components/UpdateTeamComponent";
import CreateViewProductComponent from "./components/CreateViewProductComponent";
import UpdateProductComponent from "./components/UpdateProductComponent";
import CreateProjectComponent from "./components/CreateProjectComponent";
import ListProjectComponent from "./components/ListProjectComponent";
import UpdateProjectComponent from "./components/UpdateProjectComponent";
import CreateTaskComponent from "./components/CreateTaskComponent";
import UpdateTaskComponent from "./components/UpdateTaskComponent";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <Switch>
          <Route path='/' exact component={HomeComponent}></Route>
          <Route path='/employees' exact component={ListEmployeeComponent}></Route>
          <Route path='/add-employee' exact component={CreateEmployeeComponent}></Route>
          <Route path='/update-employee/:id' exact component={UpdateEmployeeComponent}></Route>
          <Route path='/teams' exact component={ListTeamComponent}></Route>
          <Route path='/create-team' exact component={CreateTeamComponent}></Route>
          <Route path='/update-team/:id' exact component={UpdateTeamComponent}></Route>
          <Route path='/products' exact component={CreateViewProductComponent}></Route>
          <Route path='/update-products/:id' exact component={UpdateProductComponent}></Route>
          <Route path='/projects' exact component={ListProjectComponent}></Route>
          <Route path='/create-project' exact component={CreateProjectComponent}></Route>
          <Route path='/update-project/:id' exact component={UpdateProjectComponent}></Route>
          <Route path='/create-task' exact component={CreateTaskComponent}></Route>
          <Route path='/update-task/:id' exact component={UpdateTaskComponent}></Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
