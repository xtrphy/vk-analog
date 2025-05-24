import React from 'react';
import styles from './Post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
const Post = ({ post }) => {

    return (
        <div className={styles.post}>

            <div className={styles.postAuthor}>
                <div>
                    <img className={styles.profilePicture} src={post.author.profilePicture} alt={post.author.username} />
                    <h2 className={styles.authorUsername}>{post.author.username}</h2>
                </div>
                <button className={styles.subscribeBtn}>Подписаться</button>
            </div>

            <div className={styles.postContentContainer}>
                <p className={styles.postContent}>{post.content}</p>
            </div>

            <div className={styles.postInteractions}>
                <button><FontAwesomeIcon icon={faHeart} />
                    <span>1200</span>
                </button>
                <button><FontAwesomeIcon icon={faComment} />
                    <span>75</span>
                </button>
            </div>

        </div>
    );
};

export default Post;