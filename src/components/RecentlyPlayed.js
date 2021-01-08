import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/RecentlyPlayed.scss';
import { getRecentlyPlayed } from '../spotify';
import { catchErrors } from '../utils';
import Loader from './Loader';
import Moment from 'react-moment';


const pageVariants = { 
    in:{ 
        y: ["100vh", "100vh", "0vh", "0vh"],
    },
    notIn: {
        y: "100vh",
    },
    outDown: {
        y: ["0vh", "0vh", "100vh"],
    }
}

const pageTransitions = { 
    type: "tween",
    ease: "easeInOut",
    duration: 0.75,
}

export default class RecentlyPlayed extends Component {

    state = {
        recentlyPlayed: null,
    };

    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const { data } = await getRecentlyPlayed();
        this.setState({ recentlyPlayed: data });
    }

    render() {
        const { recentlyPlayed } = this.state;
        console.log(recentlyPlayed);

        return (
            <React.Fragment>
                {recentlyPlayed ? (
                    <motion.div className="background"
                    variants={pageVariants}
                    initial="notIn"
                    animate="in"
                    exit="outDown"
                    transition={pageTransitions}>
                        <div className="recents">
                            <div className="header-container-recents">
                                <h1>Recently Played Songs</h1>
                            </div>
                            <div className="users-recents-container">
                                {recentlyPlayed.items.map((recent, index) => 
                                    <div key={index} className="song-item">
                                        <a href={recent.track.external_urls.spotify} className="song-album-art" target="_blank" rel="noopener noreferrer">
                                            <img src={recent.track.album.images[1].url} alt="song album art"/>
                                        </a>
                                        <div className="song-and-artist">
                                            <a href={recent.track.external_urls.spotify} className="song-name" target="_blank" rel="noopener noreferrer">
                                                <h1> {recent.track.name} </h1>
                                            </a>
                                            <div className="artists-and-album">
                                                <div className="artists">
                                                    {recent.track.artists.map((artist, index) => (
                                                        <h2 key={index} className="artist"> 
                                                            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                                                {artist.name} 
                                                            </a>
                                                        </h2>
                                                    ))}
                                                </div>
                                                <div className="album">
                                                    <h2> 
                                                        <span> • </span> 
                                                        <a href={recent.track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer"> 
                                                            {recent.track.album.name} 
                                                        </a>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="last-played">
                                            <div className="header">
                                                <h1> Last Played </h1>
                                            </div>
                                            <div className="date">
                                                <Moment date={recent.played_at} format="MMM D, YYYY" withTitle/>
                                            </div>
                                        </div>                
                                    </div>
                                )}
                            </div>
                        </div> 
                    </motion.div>
                ) : (
                    <Loader />
                )}
            </React.Fragment>
        )
    }
}
