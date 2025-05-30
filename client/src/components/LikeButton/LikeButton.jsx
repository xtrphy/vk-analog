import React from 'react';
import styles from './LikeButton.module.css';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ postId, initialCount = 0 }) => {
    const [likesCount, setLikesCount] = useState(initialCount);
    const [isLiked, setIsLiked] = useState(false);

    const fetchLikeStatus = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/likes/${postId}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setLikesCount(data.count);
                setIsLiked(data.isLiked);
            }
        } catch (err) {
            console.error('Error fetching like status', err);
        }
    }, [postId]);

    useEffect(() => {
        fetchLikeStatus();
    }, [fetchLikeStatus]);

    const handleLikeToggle = async () => {
        const newIsLiked = !isLiked;
        const newCount = newIsLiked ? likesCount + 1 : likesCount - 1;

        setIsLiked(newIsLiked);
        setLikesCount(newCount);

        try {
            const response = await fetch(`http://localhost:3000/likes/${postId}/toggle`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setLikesCount(data.count);
                setIsLiked(data.isLiked);
            } else {
                throw new Error('Failed to toggle like');
            }
        } catch (err) {
            setIsLiked(isLiked);
            setLikesCount(likesCount);
            console.error('Error toggling like', err);
        }
    };

    return (
        <button
            onClick={handleLikeToggle}
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
        >
            <FontAwesomeIcon
                icon={isLiked ? faHeartSolid : faHeartRegular}
                className={styles.heartIcon}
            />
            <span className={styles.likeCount}>{likesCount}</span>
        </button>
    );
};

export default LikeButton;