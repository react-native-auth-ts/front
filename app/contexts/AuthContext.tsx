import { createContext, useContext, useState } from "react";
import apiClient from "@/axios";
import * as SecureStore from "expo-secure-store";
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

    const login = async (username: string, password: string) => {
        if (!username || !password) return;
        apiClient
            .post("/login", { username, password })
            .then(async res => {
                const token = await res.data.token;
                setAuthState({
                    authenticated: true,
                    username: res.data.username,
                });
                SecureStore.setItemAsync("token", token);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const logout = () => {
        apiClient
            .post("/logout")
            .then(res => {
                const token = res.data.token;
                setAuthState({
                    authenticated: false,
                    username: null,
                });
                SecureStore.deleteItemAsync("token", token);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const checkAuth = () => {
        apiClient
            .get("/check-auth")
            .then(res => {
                if (res.data.authenticated) {
                    setAuthState({
                        authenticated: true,
                        username: res.data.username,
                    });
                } else {
                    setAuthState({
                        authenticated: false,
                        username: null,
                    });
                }
            })
            .catch(err => {
                console.log(err);
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
