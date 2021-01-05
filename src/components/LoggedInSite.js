import React from 'react';
import loadable from '@loadable/component';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, useLocation} from 'react-router-dom';

const Login = loadable(() => import('./LoginScreen'));
const Profile = loadable(() => import('./Profile'));
const Playlists = loadable(() => import('./Playlists'));
const RecentlyPlayed = loadable(() => import('./RecentlyPlayed'));

function LoggedInSite() {
    const location = useLocation();

    return(
        <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/playlists" component={Playlists} />
            <Route path="/recently-played" component={RecentlyPlayed} />
        </Switch>
        </AnimatePresence>
    )
}

export default LoggedInSite;