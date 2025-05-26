import React from 'react';
import styles from './Profile.module.css';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { avatarPlaceholder } from '../../utils/constants';
import CreatePostBtn from '../../components/CreatePostBtn/CreatePostBtn';
import ProfilePosts from '../../components/ProfilePosts/ProfilePosts';

const Profile = () => {
    const { profile, setProfile } = useUser();

    const posts = profile.posts;

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

                <div className={styles.profilePosts}>
                    <CreatePostBtn />

                    <ProfilePosts posts={posts} profile={profile} />

                </div>

            </div>
        </>
    );
};

export default Profile;