import React from 'react';
import styles from './UserProfile.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import UserProfilePosts from './UserProfilePosts/UserProfilePosts';
import SubscribeButton from '../../components/SubcribeButton/SubscribeButton';
import { truncate } from '../../utils/constants';
import { Link } from 'react-router-dom';

import { avatarPlaceholder } from '../../utils/constants';
import { useUser } from '../../contexts/UserContext';

const UserProfile = () => {
    const { profile, setProfile } = useUser();
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!profile?.id) return;

            if (id === profile.id) {
                navigate('/profile');
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3000/user/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                console.log(data.posts);
                setUser(data);
                setPosts(data.posts || []);
                setSubscriptions(data.following || []);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Не удалось загрузить данные пользователя');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, navigate, profile?.id]);

    useEffect(() => {
        if (user?.id && profile?.following) {
            const isCurrentlyFollowing = profile.following.some(f => f.followee.id === user.id);
        }
    }, [profile?.following, user?.id]);

    if (loading) {
        return (
            <>
                <Header />
                <SideBar />
                <div className={styles.container}>
                    <div className={styles.loading}>Загрузка...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <SideBar />
                <div className={styles.container}>
                    <div className={styles.error}>{error}</div>
                </div>
            </>
        );
    }

    if (!user) {
        return (
            <>
                <Header />
                <SideBar />
                <div className={styles.container}>
                    <div className={styles.error}>Пользователь не найден</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <SideBar />
            <div className={styles.container}>

                <div className={styles.profileContainer}>
                    <img
                        src={user.profilePicture || avatarPlaceholder}
                        className={styles.profilePicture}
                        alt={user.username}
                        onError={(e) => {
                            e.target.src = avatarPlaceholder;
                        }}
                    />

                    <div className={styles.bioContainer}>
                        <div className={styles.editProfileContainer}>
                            <h2 className={styles.profileUsername}>{user.username}</h2>
                            {user.id && profile?.id && (
                                <SubscribeButton
                                    currentUser={profile}
                                    setCurrentUser={setProfile}
                                    targetUserId={user.id}
                                />
                            )}
                        </div>
                        {user.bio && (
                            <span className={styles.profileBio}>{user.bio}</span>
                        )}
                    </div>
                </div>

                <div className={styles.horizontalContainer}>
                    <div className={styles.profilePosts}>
                        <UserProfilePosts posts={posts} user={user} />
                    </div>

                    <div className={styles.subscriptionsContainer}>
                        <h2 className={styles.subscriptionsTitle}>
                            Подписки
                            <span className={styles.subscriptionsQuantity}>
                                {subscriptions.length > 0 ? subscriptions.length : 0}
                            </span>
                        </h2>
                        <div className={styles.subscriptions}>
                            {subscriptions.length > 0 ? (
                                <ul className={styles.followingList}>
                                    {subscriptions.map(subscription => (
                                        <li key={subscription.followee.id} className={styles.listItem}>
                                            <Link
                                                to={`/user/${subscription.followee.id}`}
                                                className={styles.followee}
                                            >
                                                <img
                                                    className={styles.followeeAvatar}
                                                    src={subscription.followee.profilePicture}
                                                    alt={subscription.followee.username}
                                                    onError={(e) => {
                                                        e.target.src = avatarPlaceholder;
                                                    }}
                                                />
                                                <span className={styles.followeeUsername}>
                                                    {truncate(subscription.followee.username, 8)}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className={styles.noSubscriptions}>
                                    У пользователя нет подписок
                                </span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default UserProfile;