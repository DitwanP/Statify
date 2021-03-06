import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { NavLink} from 'react-router-dom';
import { FaSpotify, FaUserAlt } from 'react-icons/fa';
import { BsMusicNoteList, BsArrowCounterclockwise } from 'react-icons/bs';
import { token, logout } from './spotify';
import LoggedInSite from './components/LoggedInSite';
import LoginScreen from './components/LoginScreen';
import './App.scss';

class App extends Component  {

  state = {
    token: '',
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;

    return (
        <div className="App">
          <motion.div className="nav-container"
                style={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1}}
                transition={{ ease: "easeOut", duration: 0.25, delay: 1}}>
                    <motion.a className="logo" href="https://spotify.com" target="_blank" rel="noopener noreferrer"
                    style={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1}}
                    transition={{ ease: "easeOut", duration: 0.25, delay: 1.5}}>
                        <FaSpotify/>
                    </motion.a>
                    <nav className="nav"> 
                      <motion.div className="nav-items"
                      style={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1}}
                      transition={{ ease: "easeOut", duration: 0.25, delay: 2 }}>
                        <NavLink to="/" exact activeClassName="active-link" className="nav-links">
                          <FaUserAlt/>
                          <h3 className="link-name">Profile</h3>
                        </NavLink>
                        <NavLink to="/playlists" exact activeClassName="active-link" className="nav-links">
                            <BsMusicNoteList/>
                            <h3 className="link-name">Playlists</h3>
                        </NavLink>
                        <NavLink to="/recently-played" exact activeClassName="active-link" className="nav-links">
                            <BsArrowCounterclockwise/>
                            <h3 className="link-name">Recent</h3>
                        </NavLink>
                      </motion.div>
                    </nav>
                    <motion.ul className="logout-container"
                    style={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1}}
                    transition={{ ease: "easeOut", duration: 0.25, delay: 2.5}}>
                      {token ? <button className="logout-button" onClick={logout}>Logout</button> : null}
                    </motion.ul>
            </motion.div>
          {token ? <LoggedInSite /> : <LoginScreen />}
        </div>
    );
  }
}

export default App;
