import React from 'react';
import styles from './FriendCard.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const FriendCard = ({ id, username, profilePicture }) => {
    return (
        <Link to={`/user/${id}`} className={styles.friendCard}>
            <img className={styles.friendProfilePicture} src={profilePicture} alt={username} />
            <span className={styles.friendUsername}>{username}</span>
            <button className={styles.addToFriendsBtn}><FontAwesomeIcon icon={faPlus} />Подписаться</button>
        </Link>
    );
};

export default FriendCard;