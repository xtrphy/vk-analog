import React from 'react';
import styles from './UserProfile.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import UserProfilePosts from './UserProfilePosts/UserProfilePosts';
import { truncate } from '../../utils/constants';
import { Link } from 'react-router-dom';

import { avatarPlaceholder } from '../../utils/constants';
import { useUser } from '../../contexts/UserContext';

const UserProfile = () => {
    const { profile } = useUser();
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        if (id === profile.id) {
            navigate('/profile');
        } else {
            fetch(`http://localhost:3000/user/${id}`, {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setPosts(data.posts);
                    setSubscriptions(data.following);

                })
                .catch(err => console.err(err));
        }
    }, [id, navigate, profile.id]);

    return (
        <>
            <Header />
            <SideBar />
            <div className={styles.container}>

                <div className={styles.profileContainer}>
                    <img src={user.profilePicture ? user.profilePicture : avatarPlaceholder} className={styles.profilePicture} alt={user.username} />

                    <div className={styles.bioContainer}>
                        <div className={styles.editProfileContainer}>
                            <h2 className={styles.profileUsername}>{user.username}</h2>
                            <button className={styles.editProfileBtn}>
                                Подписаться
                            </button>
                        </div>
                        <span className={styles.profileBio}>{user.bio}</span>
                    </div>
                </div>

                <div className={styles.horizontalContainer}>
                    <div className={styles.profilePosts}>
                        <UserProfilePosts posts={posts} user={user} />
                    </div>

                    <div className={styles.subscriptionsContainer}>
                        <h2 className={styles.subscriptionsTitle}>Подписки <span className={styles.subscriptionsQuantity}>{subscriptions.length > 0 ? subscriptions.length : 0}</span></h2>
                        <div className={styles.subscriptions}>
                            {subscriptions.length > 0 ? (
                                <ul className={styles.followingList}>
                                    {subscriptions.map(subscription => (
                                        <li key={subscription.followee.id} className={styles.listItem}>
                                            <Link to={`/user/${subscription.followee.id}`} className={styles.followee}>
                                                <img className={styles.followeeAvatar} src={subscription.followee.profilePicture} alt={subscription.followee.username} />
                                                <span className={styles.followeeUsername}>{truncate(subscription.followee.username, 8)}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className={styles.noSubscriptions}>У пользователя нет подписок</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default UserProfile;