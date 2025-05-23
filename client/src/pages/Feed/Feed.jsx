import React from 'react';
import styles from './Feed.module.css';
import Container from '../../components/Container/Container';
import SideBar from '../../components/SideBar/SideBar';

const Feed = () => {
    return (
        <>
            <SideBar />
            <Container>
                <h1 style={{ color: 'white' }}>Feed</h1>
            </Container>
        </>
    );
};

export default Feed;