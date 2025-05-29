import React from 'react';
import styles from './SubscribeButton.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const SubscribeButton = ({ currentUser, setCurrentUser, targetUserId }) => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        setFollowingList(currentUser.following);
    }, [currentUser]);

    const isFollowing = followingList.some(f => f.followee.id === targetUserId);

    const handleFollowToggle = async () => {
        const res = await fetch('http://localhost:3000/subscribe', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ targetUserId }),
        });

        if (!res.ok) throw new Error('Error subscribing');
        const data = await res.json();

        if (data.message === 'Subscribed') {
            setFollowingList(prev => [...prev, data.followee]);
        } else if (data.message === 'Unsubscribed') {
            setFollowingList(prev =>
                prev.filter(user => user.id !== data.followee.id)
            );
        }
    };

    return (
        <button className={styles.subscribeBtn} onClick={handleFollowToggle}>
            {isFollowing ? 'Отписаться' : 'Подписаться'}
        </button>
    );
};

export default SubscribeButton;