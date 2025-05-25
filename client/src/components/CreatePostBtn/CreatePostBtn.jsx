import React from 'react';
import styles from './CreatePostBtn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CreatePostBtn = () => {
    return (
        <button className={styles.createPostBtn}>
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.125rem' }} />
            <span className={styles.createPost}>Создать пост</span>
        </button>
    );
};

export default CreatePostBtn;