import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Post.module.css';
import SubscribeButton from '../SubcribeButton/SubscribeButton';
import LikeButton from '../LikeButton/LikeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useUser } from '../../contexts/UserContext';

const Post = ({ post }) => {
    const [user, setUser] = useState([]);
    const { profile, setProfile } = useUser();

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error(err))
    }, []);

    const lastComment = post.comments?.[0];

    let formattedCommentTime = '';
    if (lastComment?.createdAt) {
        const date = new Date(lastComment.createdAt);
        formattedCommentTime = formatDistanceToNow(date, {
            addSuffix: true,
            locale: ru,
        });
    }

    const postDate = post.createdAt;
    const timeAgo = formatDistanceToNow(postDate, { addSuffix: true, locale: ru });

    return (
        <div className={styles.post}>

            <div className={styles.wrapper}>
                <div className={styles.postAuthorContainer}>
                    <Link to={`/user/${post.author.id}`} className={styles.postAuthor}>
                        <img className={styles.profilePicture} src={post.author.profilePicture} alt={post.author.username} />
                        <h2 className={styles.authorUsername}>{post.author.username}</h2>
                    </Link>
                    {post.author && post.author.username !== profile?.username && (
                        <SubscribeButton
                            currentUser={profile}
                            setCurrentUser={setProfile}
                            targetUserId={post.author.id}
                        />
                    )}
                </div>

                <div className={styles.postContentContainer}>
                    <p className={styles.postContent}>{post.content}</p>
                </div>

                <div className={styles.postInteractions}>
                    <div className={styles.buttonsContainer}>
                        <LikeButton
                            postId={post.id}
                            initialCount={post._count.likes}
                        />
                        <button>
                            <FontAwesomeIcon icon={faComment} />
                            <span>{post._count.comments}</span>
                        </button>
                    </div>
                    <span className={styles.timeAgoPost}>{timeAgo}</span>
                </div>
                <div className={styles.line}></div>
            </div>
            {lastComment ? (
                <>
                    <div className={styles.postComment}>
                        <div className={styles.commentAuthorContainer}>
                            <img className={styles.commentAuthor} src={lastComment.author.profilePicture} alt={lastComment.author.username} />
                        </div>
                        <div className={styles.commentInfo}>
                            <h3 className={styles.commentAuthorUsername}>{lastComment.author.username}</h3>
                            <p className={styles.commentContent}>{lastComment.content}</p>
                            <span className={styles.commentCreatedAt}>{formattedCommentTime}</span>
                        </div>
                    </div>

                    <div className={styles.commentInputFieldContainer}>
                        <img className={styles.userProfilePicture} src={user.profilePicture} alt={user.username} />
                        <input
                            className={styles.commentInput}
                            type="text"
                            placeholder='Написать комментарий...'
                        />
                        <button>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </>
            ) : (
                null
            )}

        </div>
    );
};

export default Post;