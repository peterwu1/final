import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { browserHistory, Router } from 'react-router-dom';
// import routes from './routes.js';
import {  BrowserRouter as Router, Route, Link, IndexLink} from 'react-router-dom'
import Auth from './modules/Auth';


import HomePage from './components/HomePage.jsx'
import LoginPage from './containers/LoginPage.jsx'
import SignUpPage from './containers/SignUpPage.jsx'
import DashboardPage from './containers/DashboardPage.jsx';
// remove tap delay, essential for MaterialUI to work properly
// injectTapEventPlugin();
// ReactDom.render(<h1>Hello from React</h1>, document.getElementById('react-app'));



ReactDom.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
     <Router>
     <div>
	    <div className="top-bar">
	      <div  className="top-bar-left">
	        <Link to="/">Home</Link>
	      </div>
	      
 		{Auth.isUserAuthenticated() ? (
	        <div className="top-bar-right">
	          <Link to="/" 
          		onClick={ function() {
	          		Auth.deauthenticateUser();
	          		window.location.reload();
	          	}}>
	          	Log out 
	          </Link>
	        </div>
      	) : (
	        <div className="top-bar-right">
	          <Link to="/login">Log in</Link>
	          <Link to="/signup">Sign up</Link>
	        </div>
      	)}

	     </div>

	 
	     {Auth.isUserAuthenticated() ? (
	      	<Route exact path="/"  component={DashboardPage} />
	      ) : ( 
	      	<Route exact path="/" component={HomePage} />
	      )}
	      <Route path="/home" component={HomePage} />
	      <Route path="/login" component={LoginPage}/>
	      <Route path="/signup" component={SignUpPage}/>
	   
	</div>
    </Router>

  </MuiThemeProvider>), document.getElementById('react-app'));

export default SignUpPage;
// ReactDom.render(<HomePage />, document.getElementById('react-app'));