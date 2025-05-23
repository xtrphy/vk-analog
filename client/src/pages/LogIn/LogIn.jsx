import React from 'react';
import styles from './LogIn.module.css'
import { useUser } from '../../contexts/UserContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const LogIn = () => {
    const { profile } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (profile) {
            navigate('/feed');
        }
    }, [profile, navigate]);

    return (
        <div className={styles.container}>
            <h1>Добро пожаловать в ВКоннекте!</h1>
            <img className={styles.vkLogo} src="vk.png" alt="ВКоннекте" />
            <button className={styles.logInBtn} onClick={() => window.location.href = 'http://localhost:3000/auth/github'}>
                <FontAwesomeIcon icon={faGithub} className={styles.githubIcon} />
                <span className={styles.btnText}>Войти с GitHub</span>
            </button>
        </div>
    );
};

export default LogIn;