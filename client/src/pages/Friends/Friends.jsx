import React from 'react';
import styles from './Friends.module.css';
import { useEffect, useState } from 'react';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import FriendCard from '../../components/FriendCard/FriendCard';

const Friends = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/friends', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setFriends(data))
            .catch(err => console.error(err))
    }, []);

    return (
        <>
            <ScrollToTopButton />
            <Header />
            <SideBar />
            <div className={styles.container}>
                <div className={styles.friendsContainer}>
                    <h1 style={{ fontWeight: '600' }}>Возможно, вы знакомы</h1>
                    <div className={styles.friendsGrid}>
                        {friends.map(friend => (
                            <FriendCard key={friend.id} id={friend.id} username={friend.username} profilePicture={friend.profilePicture} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Friends;