import React from 'react';
import styles from './Friends.module.css';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Container from '../../components/Container/Container';

const Friends = () => {
    return (
        <>
            <ScrollToTopButton />
            <Header />
            <SideBar />
            <div className={styles.container}>
                <div className={styles.friendsContainer}>
                    <h1>TODO: Friends List</h1>
                </div>
            </div>
        </>
    );
};

export default Friends;