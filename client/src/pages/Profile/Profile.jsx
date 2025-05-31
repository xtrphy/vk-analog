import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { avatarPlaceholder } from '../../utils/constants';
import CreatePostBtn from '../../components/CreatePostBtn/CreatePostBtn';
import ProfilePosts from '../../components/ProfilePosts/ProfilePosts';
import { truncate } from '../../utils/constants';

const Profile = () => {
    const { profile } = useUser();
    const [userPosts, setUserPosts] = useState([]);
    const subscriptions = profile.following.slice(0, 4);

    useEffect(() => {
        fetch('http://localhost:3000/post', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setUserPosts(data))
            .catch(err => console.error(err));
    }, []);

    const handlePostCreated = (newPost) => {
        setUserPosts(prev => [newPost, ...prev]);
    };

    return (
        <>
            <Header />
            <SideBar />
            <div className={styles.container}>

                <div className={styles.profileContainer}>
                    <img src={profile.profilePicture ? profile.profilePicture : avatarPlaceholder} className={styles.profilePicture} alt={profile.username} />
                    <div className={styles.bioContainer}>
                        <div className={styles.editProfileContainer}>
                            <h2 className={styles.profileUsername}>{profile.username}</h2>
                            <Link to='/edit' className={styles.editProfileBtn}>
                                Редактировать профиль
                            </Link>
                        </div>
                        <span className={styles.profileBio}>{profile.bio}</span>
                    </div>
                </div>

                <div className={styles.horizontalContainer}>
                    <div className={styles.profilePosts}>
                        <CreatePostBtn onPostCreated={handlePostCreated} />

                        <ProfilePosts posts={userPosts} profile={profile} />

                    </div>

                    <div className={styles.subscriptionsContainer}>
                        <h2 className={styles.subscriptionsTitle}>Подписки <span className={styles.subscriptionsQuantity}>{subscriptions.length}</span></h2>
                        <div className={styles.subscriptions}>
                            {subscriptions.length > 0 ? (
                                <ul className={styles.followingList}>
                                    {subscriptions.map(subscription => (
                                        <li key={subscription.id} className={styles.listItem}>
                                            <Link to={`/user/${subscription.followee.id}`} className={styles.followee}>
                                                <img className={styles.followeeAvatar} src={subscription.followee.profilePicture} alt={subscription.followee.username} />
                                                <span className={styles.followeeUsername}>{truncate(subscription.followee.username, 8)}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                null
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Profile;