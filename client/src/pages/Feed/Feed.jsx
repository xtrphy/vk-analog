import React from 'react';
import styles from './Feed.module.css';
import SideBar from '../../components/SideBar/SideBar';

const Feed = () => {
    return (
        <div className={styles.feedContainer}>
            <SideBar />
        </div>
    );
};

export default Feed;