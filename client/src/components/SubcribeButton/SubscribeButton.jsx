import React from 'react';
import styles from './SubscribeButton.module.css';
import { useState, useEffect } from 'react';

const SubscribeButton = ({ className = '', currentUser, setCurrentUser, targetUserId }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (currentUser?.following && targetUserId) {
            const following = currentUser.following.some(f => f.followee.id === targetUserId);
            setIsFollowing(following);
        }
    }, [currentUser?.following, targetUserId]);

    const handleFollowToggle = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/subscribe`, {
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
                const newFollowing = {
                    followee: data.followee
                };

                setCurrentUser(prev => ({
                    ...prev,
                    following: [...(prev.following || []), newFollowing]
                }));

                setIsFollowing(true);
            } else if (data.message === 'Unsubscribed') {
                setCurrentUser(prev => ({
                    ...prev,
                    following: prev.following.filter(f => f.followee.id !== targetUserId)
                }));

                setIsFollowing(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            className={`${styles.subscribeBtn} ${className}`}
            onClick={handleFollowToggle}
        >
            {isFollowing ? 'Отписаться' : 'Подписаться'}
        </button>
    );
};

export default SubscribeButton;