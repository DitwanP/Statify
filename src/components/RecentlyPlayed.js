import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/RecentlyPlayed.scss';

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

export default class RecentlyPlayed extends Component {
    render() {
        return (
            <motion.div className="recents"
            variants={pageVariants}
            initial="notIn"
            animate="in"
            exit="outDown"
            transition={pageTransitions}>
                <h1> RecentlyPlayed! </h1>
            </motion.div>
        )
    }
}
