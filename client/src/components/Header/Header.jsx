import React from 'react';
import styles from './Header.module.css'
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img className={styles.vkLogo} src="vk.png" alt="ВКоннекте" />
                    <h2 className={styles.logoTitle}>
                        ВКоннекте
                    </h2>
                </div>
                <div className={styles.searchContainer}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                    <input className={styles.headerInput} type="text" placeholder='Поиск' />
                </div>
                <DropdownMenu />
            </div>
        </header>
    );
};

export default Header;