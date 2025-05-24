import React from 'react';
import styles from './Posts.module.css';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { Link } from 'react-router-dom';

const Posts = () => {
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

    return posts.length > 0 ? (
        <div className={styles.postsContainer}>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    ) : (
        <div className={styles.noPostsContainer}>
            <h1>Подпишитесь на авторов, чтобы видеть их посты!</h1>
            <Link className={styles.linkToFriends} to='/friends'>Авторы</Link>
        </div>
    );
};

export default Posts;