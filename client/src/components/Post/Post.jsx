import React from 'react';
import styles from './Post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
const Post = ({ post }) => {
    const lastComment = post.comments?.[0];

    let formatted = '';
    if (lastComment?.createdAt) {
        const date = new Date(lastComment.createdAt);
        formatted = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
        }).replace(',', ' в');
    }

    return (
        <div className={styles.post}>

            <div className={styles.wrapper}>
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
                        <span>{post._count.likes}</span>
                    </button>
                    <button><FontAwesomeIcon icon={faComment} />
                        <span>{post._count.comments}</span>
                    </button>
                </div>
            <div className={styles.line}></div>
            </div>
            {lastComment ? (
                <div className={styles.postComment}>
                    <div className={styles.commentAuthorContainer}>
                        <img className={styles.commentAuthor} src={lastComment.author.profilePicture} alt={lastComment.author.username} />
                    </div>
                    <div className={styles.commentInfo}>
                        <h3 className={styles.commentAuthorUsername}>{lastComment.author.username}</h3>
                        <p className={styles.commentContent}>{lastComment.content}</p>
                        <span className={styles.commentCreatedAt}>{formatted}</span>
                    </div>
                </div>
            ) : (
                ''
            )}

        </div>
    );
};

export default Post;