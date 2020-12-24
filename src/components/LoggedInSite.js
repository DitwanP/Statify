import React from 'react';
import loadable from '@loadable/component';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, useLocation} from 'react-router-dom';

const Login = loadable(() => import('./LoginScreen'));
const Profile = loadable(() => import('./Profile'));
const TopSongs = loadable(() => import('./TopSongs'));
const TopArtists = loadable(() => import('./TopArtists'));
const Playlists = loadable(() => import('./Playlists'));

function LoggedInSite() {
    const location = useLocation();

    return(
        <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/songs" component={TopSongs} />
            <Route path="/artists" component={TopArtists} />
            <Route path="/playlists" component={Playlists} />
        </Switch>
        </AnimatePresence>
    )
}

export default LoggedInSite;