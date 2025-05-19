import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './DropdownMenu.module.css';

const DropdownMenu = ({ profile }) => {
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

    return (
        <div className={styles.dropdown} ref={menuRef}>
            <img
                src={profile.profilePicture}
                alt={profile.username}
                className={styles.avatar}
                onClick={() => setOpen((prev) => !prev)}
            />
            <div className={`${styles.menu} ${open ? styles.open : ''}`}>
                <button className={styles.item}>
                    <Link to='/profile' className={styles.profileLink}>Профиль</Link>
                </button>
                <button className={styles.item} onClick={() => alert('Выход')}>
                    <Link to='/' className={styles.exitLink}>Выход</Link>
                    {/* TODO: handle click on exit button */}
                </button>
            </div>
        </div>
    );
};

export default DropdownMenu;