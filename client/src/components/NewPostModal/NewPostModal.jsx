import React, { useState } from 'react';
import styles from './NewPostModal.module.css';

const NewPostModal = ({ onClose, onPostCreated }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const res = await fetch('http://localhost:3000/post', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (res.ok) {
                const newPost = await res.json();
                onPostCreated(newPost);
                setContent('');
                onClose();
            } else {
                console.error('Error creating post');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h2>Новый пост</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className={styles.textarea}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='Напишите что-нибудь...'
                        rows='15'
                        cols='40' />
                    <div className={styles.actions}>
                        <button type='submit'>Опубликовать</button>
                        <button type='button' onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPostModal;