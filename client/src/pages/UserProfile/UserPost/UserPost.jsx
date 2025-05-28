import React from 'react';
import styles from './UserPost.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useUser } from '../../../contexts/UserContext';

const UserPost = ({ post, user }) => {
    const { profile } = useUser();
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
                    <Link to={`/user/${user.id}`} className={styles.postAuthor}>
                        <img className={styles.profilePicture} src={user.profilePicture} alt={user.username} />
                        <h2 className={styles.authorUsername}>{user.username}</h2>
                    </Link>
                </div>

                <div className={styles.postContentContainer}>
                    <p className={styles.postContent}>{post.content}</p>
                </div>

                <div className={styles.postInteractions}>
                    <div className={styles.buttonsContainer}>
                        <button><FontAwesomeIcon icon={faHeart} />
                            <span>{post._count.likes}</span>
                        </button>
                        <button><FontAwesomeIcon icon={faComment} />
                            <span>{post._count.comment}</span>
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
                        <img className={styles.userProfilePicture} src={profile.profilePicture} alt={profile.username} />
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

export default UserPost;