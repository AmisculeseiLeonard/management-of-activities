import ListEmployeeComponent from "./components/ListEmployeeComponent";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={ListEmployeeComponent}></Route>
          <Route path='/employees' exact component={ListEmployeeComponent}></Route>
          <Route path='/add-employee' exact component={CreateEmployeeComponent}></Route>
          <Route path='/update-employee/:id' exact component={UpdateEmployeeComponent}></Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
