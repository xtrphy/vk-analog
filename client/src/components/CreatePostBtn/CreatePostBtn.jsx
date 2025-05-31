import React from 'react';
import { useState } from 'react';
import styles from './CreatePostBtn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewPostModal from '../NewPostModal/NewPostModal';

const CreatePostBtn = ({ onPostCreated }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className={styles.createPostBtn} onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.125rem' }} />
                <span className={styles.createPost}>Создать пост</span>
            </button>

            {showModal && (
                <NewPostModal 
                onClose={() => setShowModal(false)}
                onPostCreated={onPostCreated}
                />
            )}
        </>
    );
};

export default CreatePostBtn;