'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Degree = 'B.Tech' | 'BCA' | 'MCA' | 'Diploma' | 'Other';
type Branch = 'CSE' | 'ISE' | 'ECE' | 'EEE' | 'Mech' | 'Civil' | 'Other';

interface UserProfile {
    email: string;
    isLoggedIn: boolean;
    degree?: Degree;
    branch?: Branch;
}

interface UserContextType {
    user: UserProfile;
    login: (email: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (degree: Degree, branch: Branch) => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile>({
        email: '',
        isLoggedIn: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    // Load from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('ai_college_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user data');
            }
        }
        setIsLoading(false);
    }, []);

    // Save to local storage whenever user changes
    useEffect(() => {
        if (user.isLoggedIn) {
            localStorage.setItem('ai_college_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ai_college_user');
        }
    }, [user]);

    const login = async (email: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For now, auto-login with just email (simulating verified OTP)
        setUser(prev => ({
            ...prev,
            email,
            isLoggedIn: true
        }));
        return true;
    };

    const logout = () => {
        setUser({
            email: '',
            isLoggedIn: false
        });
    };

    const updateProfile = (degree: Degree, branch: Branch) => {
        setUser(prev => ({
            ...prev,
            degree,
            branch
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
