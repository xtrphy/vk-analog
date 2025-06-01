import React, { useCallback, useEffect, useState } from 'react';
import styles from './CommentInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const CommentInput = ({ user, postId, setComments, onSubmit }) => {
    const [commentContent, setCommentContent] = useState('');

    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(`http://localhost:3000/comments/${postId}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (err) {
            console.error('Error fetching comments', err);
        }
    }, [postId, setComments]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleSendComment = async () => {
        if (!commentContent.trim()) return;

        try {
            const res = await fetch(`http://localhost:3000/comments/${postId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: commentContent }),
            });

            if (res.ok) {
                const data = await res.json();
                const newComment = data.comment;
                setComments(prev => [newComment, ...prev]);
                setCommentContent('');
                onSubmit?.();
            } else {
                throw new Error('Failed to get new comment');
            }
        } catch (err) {
            console.error('Error posting comment', err);
        }
    };

    return (
        <div className={styles.commentInputFieldContainer}>
            <img className={styles.userProfilePicture} src={user.profilePicture} alt={user.username} />
            <input
                className={styles.commentInput}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                autoFocus
                type="text"
                placeholder='Написать комментарий...'
            />
            <button onClick={handleSendComment} disabled={!commentContent.trim()}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
};

export default CommentInput;