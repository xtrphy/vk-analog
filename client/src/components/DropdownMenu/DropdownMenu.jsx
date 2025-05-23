import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import styles from './DropdownMenu.module.css';

import { avatarPlaceholder } from '../../utils/constants';

const DropdownMenu = () => {
    const { profile, setProfile } = useUser();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = async () => {
        setOpen(false);
        const response = await fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            setProfile(null);
            navigate('/');
        }
    };

    return (
        <div className={styles.dropdown} ref={menuRef}>
            <img
                src={profile.profilePicture ? profile.profilePicture : avatarPlaceholder}
                alt={profile.username}
                className={styles.avatar}
                onClick={() => setOpen((prev) => !prev)}
            />
            <div className={`${styles.menu} ${open ? styles.open : ''}`}>
                <Link to='/profile' className={styles.item}>Профиль</Link>
                <button className={styles.item} onClick={handleLogout}>
                    Выход
                </button>
            </div>
        </div>
    );
};

export default DropdownMenu;