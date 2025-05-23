import React from 'react';
import styles from './Header.module.css'
import DropdownMenu from '../DropdownMenu/DropdownMenu';
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
                <input className={styles.headerInput} type="text" placeholder='Поиск' />
                <DropdownMenu />
            </div>
        </header>
    );
};

export default Header;