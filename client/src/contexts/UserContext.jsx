import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:3000/profile', {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (err) {
                console.error('Error fetching profile', err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <UserContext.Provider value={{ profile, setProfile, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);