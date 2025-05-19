import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Header.module.css'
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const Header = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
            .then(data => {
                setProfile(data);
            })
            .catch(err => {
                console.error('User not logged in', err);
            });
    }, [profile]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img className={styles.vkLogo} src="vk.png" alt="ВКоннекте" />
                    <h2 className={styles.logoTitle}>
                        ВКоннекте
                    </h2>
                </div>
                <input className={styles.headerInput} type="text" placeholder='Поиск' />
                <DropdownMenu profile={profile} />
            </div>
        </header>
    );
};

export default Header;