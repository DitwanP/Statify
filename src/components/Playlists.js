import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/Playlists.scss';
import { getPlaylists } from '../spotify';
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
                    <div>
                        <motion.div className="playlists"
                        variants={pageVariants}
                        initial="notIn"
                        animate="in"
                        exit="outDown"
                        transition={pageTransitions}>
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
                        </motion.div> 
                    </div>
                ) : (
                    <Loader />
                )}
            </React.Fragment>
        )
    }
}
