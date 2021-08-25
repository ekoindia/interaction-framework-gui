import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Menu from './components/Menu/Menu';
import FlowDFD from './components/FlowDFD/FlowDFD';

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route path="/dfd/:id" component={FlowDFD} ></Route>
          <Route path="/" component={Menu} ></Route>
        </Switch>
      </Router>
      </div>
    )
  }
}
export default App;
