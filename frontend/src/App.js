// import logo from './logo.svg';
// import './App.css';

import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import HousingList from "./components/housing-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (

    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/housing-list" className="navbar-brand">
          Housing List
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/housing-list"} className="nav-link">
              Housing
            </Link>
          </li>

          <li className="nav-item">
            {user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'point'}} href="/#">
                Logout {user.name}
              </a>
             ) : (
              // False
              <Link to={"/login"} className="nav-link">
                Login
              </Link> 
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={["/", "/housing-list"]} component={HousingList} /> 
          <Route path="/login" render={(props) => (
            <Login {...props} login={login} />
          )} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
