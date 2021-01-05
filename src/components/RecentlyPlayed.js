import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/RecentlyPlayed.scss';

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
