import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
                credentials: 'include',
            });

            if (res.status === 401) {
                console.log('Unauthorized');
                setProfile(null);
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setProfile(data);
            } else {
                setProfile(null);
            }
        } catch (err) {
            console.error('Error fetching profile', err);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const refreshProfile = () => {
        setLoading(true);
        fetchProfile();
    };

    const updateFollowing = (targetUserId, isFollowing, followeeData) => {
        setProfile(prev => {
            if (!prev) return prev;

            if (isFollowing) {
                const newFollowing = {
                    followee: followeeData
                };
                return {
                    ...prev,
                    following: [...(prev.following || []), newFollowing]
                };
            } else {
                return {
                    ...prev,
                    following: prev.following.filter(f => f.followee.id !== targetUserId)
                };
            }
        });
    };

    const contextValue = {
        profile,
        setProfile,
        loading,
        refreshProfile,
        updateFollowing
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};