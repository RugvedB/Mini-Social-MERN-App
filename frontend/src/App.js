import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'
import Home from './components/Home'
import NavbarComponent from './components/NavbarComponents'
import Register from './components/Register'
import Login from './components/Login'
import Notifications from './components/Notifications'
import Logout from './components/Logout'
import Footer from './components/Footer'
import ErrorComponent from './components/ErrorComponent';
import Profile from './components/Profile'
import Verify from './components/Verify'
class App extends Component {
  render() {
    return (
    <div  className="App">
      <Router>
      <NavbarComponent/>
      <Switch>
      <Route exact path="/" component={Register} />
      
            
            
            <Route exact path="/home" component={Home} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/error" component={ErrorComponent} />
            <Route path="/profile/:mailId" component={Profile} />

            {/* <Route exact path="/Headlines" component={Headlines} /> */}
            {/* <Route exact path="/Selection" component={Selection} /> */}
            <Redirect to="/login" />
      
        </Switch>
        <Footer />
        </Router>
        
    </div>
  );
}
}

export default App;
