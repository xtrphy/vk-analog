import React from 'react';
import styles from './UserProfilePosts.module.css';
import UserPost from '../UserPost/UserPost';

const UserProfilePosts = ({ posts, user }) => {
    return posts.length > 0 ? (
        <div className={styles.postsContainer}>
            {posts.map(post => (
                <UserPost key={post.id} post={post} user={user} />
            ))}
        </div>
    ) : (
        <div className={styles.noPostsContainer}>
            <h1>У пользователя ещё нет постов.</h1>
        </div>
    );
};

export default UserProfilePosts;