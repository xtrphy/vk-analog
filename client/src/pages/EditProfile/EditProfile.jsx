import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { useState } from 'react';
import styles from './EditProfile.module.css';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

import { avatarPlaceholder } from '../../utils/constants';

const EditProfile = () => {
    const { profile, setProfile } = useUser();
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        if (bio.trim() !== '') data.bio = bio;
        if (profilePicture.trim() !== '') data.profilePicture = profilePicture;

        const res = await fetch('http://localhost:3000/profile/edit', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (res.ok) {
            setProfile((prev) => ({
                ...prev,
                ...(bio.trim() && { bio }),
                ...(profilePicture.trim() && { profilePicture })
            }));
        }

        const result = await res.json();
        alert(result.message);
    };

    return (
        <>
            <Header />
            <SideBar />
            <div className={styles.container}>
                <div className={styles.editProfileContainer}>
                    <h1 className={styles.title}>Профиль</h1>
                    <div className={styles.profileInfo}>
                        <img src={profile.profilePicture ? profile.profilePicture : avatarPlaceholder} className={styles.profilePicture} alt={profile.username} />

                        <div className={styles.bioContainer}>
                            <h2 className={styles.profileUsername}>{profile.username}</h2>
                            <span className={styles.profileBio}>{profile.bio}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.inputFieldsContainer}>
                    <h2 className={styles.subtitle}>
                        Измените данные
                    </h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.textareaContainer}>
                            <span>Краткая информация:</span>
                            <textarea
                                className={styles.bioInput}
                                name="bio"
                                id="bio"
                                placeholder='Расскажите о себе'
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <span>URL адрес аватарки:</span>
                            <input
                                className={styles.avatarInput}
                                type="text"
                                name="profilePicture"
                                id="profilePicture"
                                value={profilePicture}
                                onChange={(e) => setProfilePicture(e.target.value)}
                                placeholder='Укажите URL вашей аватарки'
                            />
                        </div>

                        <button className={styles.submitBtn} type='submit'>
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;