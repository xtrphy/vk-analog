import React from 'react';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faWindowMaximize, faUserGroup } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    return (
        <aside className={styles.aside}>
            <ul className={styles.asideLinkList}>
                <Link className={styles.asideLink} to='/profile'>
                    <FontAwesomeIcon icon={faUser} style={{ color: '#71aaeb' }} />
                    Профиль
                </Link>

                <Link className={styles.asideLink} to='/feed'>
                    <FontAwesomeIcon icon={faWindowMaximize} style={{ color: '#71aaeb' }} />
                    Лента
                </Link>

                <Link className={styles.asideLink} to='/friends'>
                    <FontAwesomeIcon icon={faUserGroup} style={{ color: '#71aaeb' }} />
                    Друзья
                </Link>
            </ul>
        </aside>
    );
};

export default SideBar;