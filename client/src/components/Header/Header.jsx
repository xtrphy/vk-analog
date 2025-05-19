import React from 'react';
import styles from './Header.module.css'

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
                <img className={styles.avatar} src="https://sun1-94.userapi.com/s/v1/ig2/PreTLalGJ2gGqWQnZG9Vg3AMsLx9WH7f3u_F0AdVBaYnz9ob4kWGPEnsZ7KTpaOTK4km75rzCvSoot2CQBC-Vq8c.jpg?quality=95&crop=0,237,755,755&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=1JHPrX5wdqe-8SYr6EVxdp70DOZO5Bzz3P1VgrkBnsU&cs=200x200" alt="profile picture" />
            </div>
        </header>
    );
};

export default Header;