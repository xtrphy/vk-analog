import React from 'react';
import Container from '../../components/Container/Container';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import SideBar from '../../components/SideBar/SideBar';
import PossibleFriends from '../../components/PossibleFriends/PossibleFriends';
import Posts from '../../components/Posts/Posts';
import CreatePostBtn from '../../components/CreatePostBtn/CreatePostBtn';

const Feed = () => {
    return (
        <>
            <ScrollToTopButton />
            <SideBar />
            <Container>

                <PossibleFriends />

                <CreatePostBtn />

                <Posts />

            </Container>
        </>
    );
};

export default Feed;