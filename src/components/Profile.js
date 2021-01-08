import React, { Component } from 'react';
import Loader from './Loader';
import { motion } from 'framer-motion';
import { catchErrors } from '../utils';
import { getUserInfo, getTopSongsAndArtists} from '../spotify';

import styled from 'styled-components/macro';
import '../styles/Profile.scss';

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

const RangeButton = styled.button`
    background-color: transparent;
    color: ${props => (props.isActive ? '#f0f0f0' : '#999999')};
    font-size: 18px;
    font-weight: 500;
    margin: 0rem 0.5rem;
    outline: none;
    border: none;

    span {
        padding-bottom: 2px;
        border-bottom: 1px solid ${props => (props.isActive ? '#f0f0f0' : `transparent`)};
        line-height: 1.5;
        white-space: nowrap;
    }
`;

class Profile extends Component {

    state = {
        user: null,
        followedArtists: null,
        playlists: null,
        artistsLong: null, 
        artistsMedium: null, 
        artistsShort: null, 
        songsLong: null, 
        songsMedium: null, 
        songsShort: null,
        topTracksData: null,
        topArtistsData: null,
        activeRange: 'long',
        artistsActiveRange: 'artistsMedium',
        makeSongsVisible: true,
        makeArtistsVisible: false,
    };

    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const { user, followedArtists, playlists } = await getUserInfo();
        const { artistsLong, artistsMedium, artistsShort, songsLong, songsMedium, songsShort } = await getTopSongsAndArtists();
        this.setState({ user, 
            followedArtists, 
            playlists, 
            artistsLong, 
            artistsMedium, 
            artistsShort, 
            songsLong, 
            songsMedium, 
            songsShort, 
            topTracksData: songsLong,
            topArtistsData: artistsLong});
    }

    async toSongsTab() {
        this.setState({ makeSongsVisible: true, makeArtistsVisible: false })
    }

    async toArtistsTab() {
        this.setState({ makeSongsVisible: false, makeArtistsVisible: true })
    }

    async changeRange(range) {
        if(range === 'long'){
            const data = this.state.songsLong;
            this.setState({ topTracksData: data, activeRange: range });
        }
        else if(range === 'medium'){
            const data = this.state.songsMedium;
            this.setState({ topTracksData: data, activeRange: range });
        }
        else if(range === 'short'){
            const data = this.state.songsShort;
            this.setState({ topTracksData: data, activeRange: range });
        }
    }

    async changeRangeArtists(range) {
        if(range === 'artistsLong'){
            const data = this.state.artistsLong;
            this.setState({ topArtistsData: data, artistsActiveRange: range });
        }
        else if(range === 'artistsMedium'){
            const data = this.state.artistsMedium;
            this.setState({ topArtistsData: data, artistsActiveRange: range });
        }
        else if(range === 'artistsShort'){
            const data = this.state.artistsShort;
            this.setState({ topArtistsData: data, artistsActiveRange: range });
        }
    }

    viewSongsTab = () => catchErrors(this.toSongsTab());
    viewArtistsTab = () => catchErrors(this.toArtistsTab());
    setActiveRange = range => catchErrors(this.changeRange(range));
    setActiveRangeArtists = range => catchErrors(this.changeRangeArtists(range));

    render() {

        const { user, 
            followedArtists, 
            playlists, 
            topArtistsData, 
            topTracksData,  
            activeRange,
            artistsActiveRange,
            makeSongsVisible,
            makeArtistsVisible} = this.state;
            
        const totalPlaylists = playlists ? playlists.total : 0;

        // const tabForSongsVisibilityTest = makeSongsVisible ? 'show' : 'hide';
        // console.log('What to do with top songs div?', tabForSongsVisibilityTest);
        
        // const tabForArtistsVisibilityTest = makeArtistsVisible ? 'show' : 'hide';
        // console.log('What to do with top artists div?', tabForArtistsVisibilityTest);

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
                                    <h2>{totalPlaylists}</h2>
                                    <h3>Playists</h3>
                                </div>
                                <div className="following">
                                    <h2>{followedArtists.artists.total}</h2>
                                    <h3>Following</h3>
                                </div>
                            </div>
                        </div>
                        <div className="body-container">
                            <div className="choice-container">
                                <div className="top-songs-button">
                                    <RangeButton className="top-songs-tab-button"
                                    isActive={makeSongsVisible}
                                    onClick={() => this.viewSongsTab('songs')}>
                                        <span>Top Songs</span>
                                    </RangeButton>
                                </div>
                                <div className="top-artist-button">
                                    <RangeButton className="top-artists-tab-button"
                                    isActive={makeArtistsVisible}
                                    onClick={() => this.viewArtistsTab('artists')}>
                                        <span>Top Artists</span>
                                    </RangeButton>
                                </div>
                            </div>
                            <div className="top-songs" 
                            value={makeSongsVisible ? 'show' : 'hide'}>
                                <div className="header-for-top-lists">
                                    <h1>Top Songs</h1>
                                    <div className="ranges">
                                        <RangeButton className="range-button-top-songs"
                                        isActive={activeRange === 'long'}
                                        onClick={() => this.setActiveRange('long')}>
                                            <span>All Time</span>
                                        </RangeButton>
                                        <RangeButton className="range-button-top-songs"
                                        isActive={activeRange === 'medium'}
                                        onClick={() => this.setActiveRange('medium')}>
                                            <span>Last 6 Months</span>
                                        </RangeButton>
                                        <RangeButton className="range-button-top-songs"
                                        isActive={activeRange === 'short'}
                                        onClick={() => this.setActiveRange('short')}>
                                            <span>Last Month</span>
                                        </RangeButton>
                                    </div>
                                </div>
                                <ul className="songs">
                                    {topTracksData ? (
                                        topTracksData.items.map((song, index) => 
                                        <li key={index}> 
                                            <img className="album-cover" src={song.album.images[2].url} alt="album-cover"/> 
                                            <div className="title-and-artist">
                                                <div className="song">
                                                    <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                                        <h2 className="song-title">{song.name}</h2>
                                                    </a>
                                                </div>
                                                <div className="artists">
                                                    {song.artists.map((artist, index) => (
                                                        <h3 key={index}> {artist.name} </h3>
                                                    ))}
                                                </div>
                                            </div>
                                        </li>
                                    )) : (
                                        <Loader />
                                    )}
                                </ul>     
                            </div>
                            <div className="top-artists"
                            value={makeArtistsVisible ? 'show' : 'hide'}>
                                <div className="header-for-top-lists">
                                    <h1>Top Artists</h1>
                                    <div className="ranges">
                                        <RangeButton className="range-button-top-artists"
                                        isActive={artistsActiveRange === 'artistsLong'}
                                        onClick={() => this.setActiveRangeArtists('artistsLong')}>
                                            <span>All Time</span>
                                        </RangeButton>
                                        <RangeButton className="range-button-top-artists"
                                        isActive={artistsActiveRange === 'artistsMedium'}
                                        onClick={() => this.setActiveRangeArtists('artistsMedium')}>
                                            <span>Last 6 Months</span>
                                        </RangeButton>
                                        <RangeButton className="range-button-top-artists"
                                        isActive={artistsActiveRange === 'artistsShort'}
                                        onClick={() => this.setActiveRangeArtists('artistsShort')}>
                                            <span>Last Month</span>
                                        </RangeButton>
                                    </div>
                                </div>
                                <ul className="artists">
                                    {topArtistsData ? (
                                        topArtistsData.items.map((artist, index) => 
                                        <li key={index}> 
                                            <div className="avatar-and-name">
                                                <img className="artist-avatar" src={artist.images[2].url} alt="artist-avatar"/> 
                                                <a className="artist-name" href={artist.href} target="_blank" rel="noopener noreferrer">
                                                    <h1> {artist.name} </h1>
                                                </a>
                                            </div>
                                            <div className="popularity">
                                                <h1>Popularity - <span>{artist.popularity}</span></h1>
                                            </div>
                                        </li>
                                    )) : (
                                        <Loader />
                                    )}
                                </ul>
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

export default Profile;