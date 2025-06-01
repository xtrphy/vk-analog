import React from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';
import { Link } from 'react-router-dom';

const Posts = ({ posts, setPosts }) => {
    return posts.length > 0 ? (
        <div className={styles.postsContainer}>
            {posts.map(post => (
                <Post key={post.id} post={post} setPosts={setPosts} />
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