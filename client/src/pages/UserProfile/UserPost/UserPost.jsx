import React from 'react';
import { useEffect, useState, useRef } from 'react';
import styles from './UserPost.module.css';
import CommentInput from '../../../components/CommentInput/CommentInput';
import LikeButton from '../../../components/LikeButton/LikeButton';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useUser } from '../../../contexts/UserContext';

const UserPost = ({ post, user }) => {
    const { profile } = useUser();
    const [comments, setComments] = useState(post.comments);
    const [isWritingComment, setIsWritingComment] = useState(false);
    const commentInputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (commentInputRef.current && !commentInputRef.current.contains(e.target)) {
                setIsWritingComment(false);
            }
        };

        if (isWritingComment) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isWritingComment]);

    const lastComment = comments?.[0];

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

    const handleCommentSubmit = () => {
        setIsWritingComment(false);
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const data = await res.json();
                const deletedComment = data.deletedComment;
                setComments(prev => prev.filter(comment => comment.id !== deletedComment.id));
            }
        } catch (err) {
            console.error('Error deleting comment', err);
        }
    };

    return (
        <div className={styles.post}>

            <div className={styles.wrapper}>
                <div className={styles.postAuthorContainer}>
                    <Link to={`/user/${user.id}`} className={styles.postAuthor}>
                        <img className={styles.profilePicture} src={user.profilePicture} alt={user.username} />
                        <h2 className={styles.authorUsername}>{user.username}</h2>
                    </Link>
                </div>

                {post.imageUrl && (
                    <div className={styles.postImageContainer}>
                        <img className={styles.postImage} src={post.imageUrl} alt='' />
                    </div>
                )}

                <div className={styles.postContentContainer}>
                    <p className={styles.postContent}>{post.content}</p>
                </div>

                <div className={styles.postInteractions}>
                    <div className={styles.buttonsContainer}>
                        <LikeButton
                            postId={post.id}
                            initialCount={post._count.likes}
                        />
                        <button onClick={() => setIsWritingComment(true)}>
                            <FontAwesomeIcon icon={faComment} />
                            <span>{comments?.length || 0}</span>
                        </button>
                    </div>
                    <span className={styles.timeAgoPost}>{timeAgo}</span>
                </div>
                {isWritingComment && profile && (
                    <div ref={commentInputRef}>
                        <CommentInput
                            user={profile}
                            setComments={setComments}
                            postId={post.id}
                            onSubmit={handleCommentSubmit}
                        />
                    </div>
                )}
                <div className={styles.line}></div>
            </div>
            {lastComment && lastComment.author && (
                <>
                    <div className={styles.postComment}>
                        <div className={styles.leftSide}>
                            <div className={styles.commentAuthorContainer}>
                                <img className={styles.commentAuthor} src={lastComment.author.profilePicture} alt={lastComment.author.username} />
                            </div>
                            <div className={styles.commentInfo}>
                                <h3 className={styles.commentAuthorUsername}>{lastComment.author.username}</h3>
                                <p className={styles.commentContent}>{lastComment.content}</p>
                                <span className={styles.commentCreatedAt}>{formattedCommentTime}</span>
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            {lastComment.authorId === profile.id && (
                                <button onClick={() => handleDeleteComment(lastComment.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'gray' }} />
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default UserPost;