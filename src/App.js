import React from 'react';
import loadable from '@loadable/component'
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Switch, NavLink, useLocation} from 'react-router-dom';
import { FaGithub, FaSpotify, FaUserAlt } from 'react-icons/fa';
import { BsMusicNoteList, BsMusicNote } from 'react-icons/bs';
import { GiMicrophone } from 'react-icons/gi';
import './App.scss';

const Profile = loadable(() => import('./components/Profile'));
const TopSongs = loadable(() => import('./components/TopSongs'));
const TopArtists = loadable(() => import('./components/TopArtists'));
const Playlists = loadable(() => import('./components/Playlists'));

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <motion.div className="sidenav-container"
                style={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1}}
                transition={{ ease: "easeOut", duration: 0.25, delay: 1}}>
                    <motion.a className="logo" href="https://statify.com/" target="_blank" rel="noopener noreferrer"
                    style={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1}}
                    transition={{ ease: "easeOut", duration: 0.25, delay: 1.5}}>
                        <FaSpotify/>
                    </motion.a>
                    <nav className="nav"> 
                      <motion.div className="ham-nav-items"
                      style={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1}}
                      transition={{ ease: "easeOut", duration: 0.25, delay: 2 }}>
                        <NavLink to="/" exact activeClassName="active-link" className="nav-links">
                          <FaUserAlt/>
                          <h3 className="link-name">Profile</h3>
                        </NavLink>
                        <NavLink to="/songs" exact activeClassName="active-link" className="nav-links">
                          <BsMusicNote/>
                          <h3 className="link-name">Top Songs</h3>
                        </NavLink>
                        <NavLink to="/artists" exact activeClassName="active-link" className="nav-links">
                          <GiMicrophone/>
                          <h3 className="link-name">Top Artists</h3>
                        </NavLink>
                        <NavLink to="/playlists" exact activeClassName="active-link" className="nav-links">
                            <BsMusicNoteList/>
                            <h3 className="link-name">Playlists</h3>
                          </NavLink>
                      </motion.div>
                    </nav>
                    <motion.ul className="socials"
                    style={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1}}
                    transition={{ ease: "easeOut", duration: 0.25, delay: 2.5}}>
                      <a className="github" href="https://github.com/DitwanP/Statify" target="_blank" rel="noopener noreferrer">
                          <FaGithub/>
                      </a>
                    </motion.ul>
            </motion.div>
            <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                    <Route exact path="/" component={Profile} />
                    <Route path="/songs" component={TopSongs} />
                    <Route path="/artists" component={TopArtists} />
                    <Route path="/playlists" component={Playlists} />
                </Switch>
            </AnimatePresence>
        </div>
    );
}

export default App;
