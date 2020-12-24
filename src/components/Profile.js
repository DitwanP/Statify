import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/Profile.scss';

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

export default class Profile extends Component {
    render() {
        return (
            <motion.div className="profile"
            variants={pageVariants}
            initial="notIn"
            animate="in"
            exit="outDown"
            transition={pageTransitions}>
                <div className="header-container">
                    <div className="avatar"></div>
                    <div className="account-name"> 
                        <h1> just-shuttup </h1> 
                    </div>
                    <div className="account-stats">
                        <div className="followers">
                            <h2>X</h2>
                            <h3>Followers</h3>
                        </div>
                        <div className="number-of-playlists">
                            <h2>X</h2>
                            <h3>Playists</h3>
                        </div>
                        <div className="following">
                            <h2>X</h2>
                            <h3>Following</h3>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }
}
