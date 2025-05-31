import React from 'react';
import { useState, useEffect } from 'react';
import Container from '../../components/Container/Container';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';
import SideBar from '../../components/SideBar/SideBar';
import PossibleFriends from '../../components/PossibleFriends/PossibleFriends';
import Posts from '../../components/Posts/Posts';
import CreatePostBtn from '../../components/CreatePostBtn/CreatePostBtn';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/feed/posts', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handlePostCreated = (newPost) => {
        setPosts(prev => [newPost, ...prev]);
    };

    return (
        <>
            <ScrollToTopButton />
            <SideBar />
            <Container>

                <PossibleFriends />

                <CreatePostBtn onPostCreated={handlePostCreated} />

                <Posts posts={posts} />

            </Container>
        </>
    );
};

export default Feed;