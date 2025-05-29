import React from 'react';
import styles from './FriendCard.module.css';
import SubscribeButton from '../SubcribeButton/SubscribeButton';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../contexts/UserContext';

const FriendCard = ({ id, username, profilePicture }) => {
    const { profile, setProfile } = useUser();

    return (
        <div className={styles.friendCard}>
            <Link to={`/user/${id}`} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img className={styles.friendProfilePicture} src={profilePicture} alt={username} />
                <span className={styles.friendUsername}>{username}</span>
            </Link>
            <SubscribeButton
                currentUser={profile}
                setCurrentUser={setProfile}
                targetUserId={id}
                className={styles.addToFriendsBtn}
            />
        </div>
    );
};

export default FriendCard;