import React from 'react';
import styles from './UserCard.module.css';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
    const truncate = (str, maxLen) => {
        return str.length > maxLen ? str.slice(0, maxLen) + "..." : str;
    };

    return (
        <Link to={`/user/${user.id}`} className={styles.userCard}>
            <img className={styles.profilePicture} src={user.profilePicture} alt={user.username} />
            <div className={styles.cardGradient}></div>
            <h3 className={styles.username}>{truncate(user.username, 9)}</h3>
        </Link>
    );
};

export default UserCard;