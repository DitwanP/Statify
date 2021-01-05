import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/Playlists.scss';
import { getPlaylists } from '../spotify';
import { catchErrors } from '../utils';
import Loader from './Loader';

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


export default class Playlists extends Component {

    state = {
        playlists: null,
    };

    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const { data } = await getPlaylists();
        this.setState({ playlists: data });
    }  

    render() {
        const { playlists } = this.state;
        console.log(playlists);

        return (
            <React.Fragment>
                { playlists ? (
                    <motion.div className="background"
                    variants={pageVariants}
                    initial="notIn"
                    animate="in"
                    exit="outDown"
                    transition={pageTransitions}>
                        <div className="playlists">
                            <div className="header-container">
                                <h1>Your Playlists</h1>
                            </div>
                            <div className="users-playlists-container">
                                {playlists.items.map((playlist, index) => 
                                    <div key={index} className="playlist-item">
                                        <a href={playlist.external_urls.spotify} className="playlist-image" target="_blank" rel="noopener noreferrer">
                                            <img src={playlist.images[0].url} alt="playlist thumbnail"/>
                                        </a>
                                        <a href={playlist.external_urls.spotify} className="playlist-name" target="_blank" rel="noopener noreferrer">
                                            <h1> {playlist.name} </h1>
                                        </a>
                                        <h2> {playlist.tracks.total} SONGS </h2>
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
