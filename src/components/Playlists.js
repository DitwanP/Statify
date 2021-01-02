import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/Playlists.scss';

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
    render() {
        return (
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

                </div>
            </motion.div>
        )
    }
}
