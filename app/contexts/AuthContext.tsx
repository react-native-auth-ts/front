import { createContext, useContext, useState } from "react";

interface AuthProps {
    authState: { authenticated: boolean | null; username: string | null };
    onLogin: (username: string, password: string) => void;
    Logout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        authenticated: boolean | null;
        username: string | null;
    }>({
        authenticated: null,
        username: null,
    });

    const login = (username: string, password: string) => {
        if (!username || !password) return;
        setAuthState({
            authenticated: true,
            username: username,
        });
    };

    const logout = async () => {
        setAuthState({
            authenticated: false,
            username: null,
        });
    };

    const value = {
        onLogin: login,
        Logout: logout,
        authState,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
