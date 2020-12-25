import React, { Component } from 'react';
import { motion } from 'framer-motion';
import '../styles/Profile.scss';
import { getUserInfo, logout } from '../spotify';
import { catchErrors } from '../utils';
import Loader from './Loader';

const pageVariants = { 
    in:{ 
        scale: [0.95, 0.95, 0.95, 1],
        x: ["100vw", "100vw", "0vw", "0vw"],
    },
    notIn: {
        scale: 0.95,
        x: "100vw",
    },
    outDown: {
        scale: [1, 0.95, 0.95],
        y: [0, 0, 1000],
    }
}

const pageTransitions = { 
    type: "tween",
    ease: "easeInOut",
    duration: 0.75,
}

class Profile extends Component {
    state = {
        user: null,
        followedArtists: null,
        playlists: null,
        topArtists: null,
        topTracks: null,
    };

    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();
        this.setState({ user, followedArtists, playlists, topArtists, topTracks });
    }

    render() {

        const { user, followedArtists, playlists, topArtists, topTracks } = this.state;
        const totalPlaylists = playlists ? playlists.total : 0;

        {playlists ? console.log(this.state.playlists) : console.log('user does not have any data at the moment!')};

        return (
            <React.Fragment>
                { user ? (
                    <motion.div className="profile"
                    variants={pageVariants}
                    initial="notIn"
                    animate="in"
                    exit="outDown"
                    transition={pageTransitions}>
                        <div className="header-container">
                            <div className="avatar-container">
                                {user.images.length > 0 ? (
                                    <img className="avatar" src={user.images[0].url} alt="avatar" />
                                ) : (
                                    <div className="avatar">
                                        <h1> NO AVATAR </h1>
                                    </div>
                                )}
                            </div>
                            <div className="account-name"> 
                                <a href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                    <h1> {user.display_name} </h1>
                                </a> 
                            </div>
                            <div className="account-stats">
                                <div className="followers">
                                    <h2>{user.followers.total}</h2>
                                    <h3>Followers</h3>
                                </div>
                                <div className="number-of-playlists">
                                    <h2>{playlists.total}</h2>
                                    <h3>Playists</h3>
                                </div>
                                <div className="following">
                                    <h2>{followedArtists.artists.total}</h2>
                                    <h3>Following</h3>
                                </div>
                            </div>
                            <button className="logout-button" onClick={logout}>Logout</button>
                        </div>
                    </motion.div>
                ) : (
                    <Loader />
                )} 
            </React.Fragment>
        )
    }
}

export default Profile;