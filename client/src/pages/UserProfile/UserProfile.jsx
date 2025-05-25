import React from 'react';
import styles from './UserProfile.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

import { avatarPlaceholder } from '../../utils/constants';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.err(err));
    }, [id]);

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
            </div>
        </>
    );
};

export default UserProfile;