import React from 'react';
import { useEffect, useState } from 'react';
import styles from './PossibleFriends.module.css';
import UserCard from './UserCard/UserCard';

const PossibleFriends = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/feed/suggested-users`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div className={styles.possibleFriendsContainer}>
                {users.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    );
};

export default PossibleFriends;