import React from 'react';
import styles from './ProfilePosts.module.css';
import ProfilePost from '../ProfilePost/ProfilePost';

const ProfilePosts = ({ posts, profile }) => {
    return posts.length > 0 ? (
        <div className={styles.postsContainer}>
            {posts.map(post => (
                <ProfilePost key={post.id} post={post} profile={profile} />
            ))}
        </div>
    ) : (
        <div className={styles.noPostsContainer}>
            <h1>У вас ещё нет постов.</h1>
        </div>
    );
};

export default ProfilePosts;