import React from 'react';
import styles from './Feed.module.css';
import { useUser } from '../../contexts/UserContext';

const Feed = () => {
    const { profile } = useUser();

    return (
        <div className={styles.feedContainer}>
            <h1 style={{ color: 'white' }}>{profile.username}</h1>
        </div>
    );
};

export default Feed;