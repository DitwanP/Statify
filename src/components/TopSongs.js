import React, { Component } from 'react';
import { motion } from "framer-motion";
import '../styles/TopSongs.scss';

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

// const container = { 
//     start:{ 
//         y: 40, opacity: 0 
//     },
//     end: {
//         y: 0, opacity: 1 
//     },
//     rotate: {
//         scale: 1.1, rotateX: 180
//     },
// }

export default class TopSongs extends Component {
    render() {
        return (
            <motion.div className="top-songs"
            variants={pageVariants}
            initial="notIn"
            animate="in"
            exit="outDown"
            transition={pageTransitions}>
                <h1> TopSongs! </h1>
            </motion.div>
        )
    }
}
