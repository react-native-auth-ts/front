import { createContext, useContext, useState } from "react";
import apiClient from "@/axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface AuthProps {
    authState: { authenticated: boolean | null; username: string | null };
    onLogin: (username: string, password: string) => void;
    onRegister: (email: string, username: string, password: string) => void;
    onCheckAuth: () => void;
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
        apiClient
            .post("/login", { username, password })
            .then(async res => {
                const token: string = res.data.token;
                setAuthState({
                    authenticated: true,
                    username: res.data.username,
                });
                await SecureStore.setItemAsync("token", token);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const register = (email: string, username: string, password: string) => {
        if (!username || !password) return;
        apiClient
            .post("/register", { email, username, password })
            .then(async res => {
                let token: string = res.data.token;
                token = token.replace(/\d+\|/, "");
                console.log(token);
                setAuthState({
                    authenticated: true,
                    username: res.data.username,
                });
                await SecureStore.setItemAsync("token", token);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const logout = () => {
        apiClient
            .post("/logout")
            .then(res => {
                setAuthState({
                    authenticated: false,
                    username: null,
                });
                SecureStore.deleteItemAsync("token");
            })

            .catch(err => {
                console.log(err);
            });
    };

    const checkAuth = () => {
        apiClient
            .get("/checkAuth")
            .then(res => {
                console.log("check-auth");
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
        onRegister: register,
        onCheckAuth: checkAuth,
        authState,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
