import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './Feed.module.css';
import Container from '../../components/Container/Container';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import SideBar from '../../components/SideBar/SideBar';
import PossibleFriends from '../../components/PossibleFriends/PossibleFriends';
import Posts from '../../components/Posts/Posts';

const Feed = () => {
    return (
        <>
            <ScrollToTopButton />
            <SideBar />
            <Container>

                <PossibleFriends />

                <button className={styles.createPostBtn}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.125rem'}} />
                    <span className={styles.createPost}>Создать пост</span>
                </button>

                <Posts />

            </Container>
        </>
    );
};

export default Feed;