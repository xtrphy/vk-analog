import React from 'react';
import styles from './UserProfile.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import UserProfilePosts from './UserProfilePosts/UserProfilePosts';

import { avatarPlaceholder } from '../../utils/constants';
import { useUser } from '../../contexts/UserContext';

const UserProfile = () => {
    const { profile } = useUser();
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);

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
                <div className={styles.profilePosts}>
                    <UserProfilePosts posts={posts} user={user} />
                </div>
            </div>
        </>
    );
};

export default UserProfile;