import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const StackLayout = () => {
    const { authState } = useAuth();
    const { onCheckAuth } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        const checkAuth = async () => {
            const inAuthGroup = segments[0] === "(protected)";
            const token = await SecureStore.getItemAsync("token");

            if (token && !authState?.authenticated) {
                onCheckAuth!();
            }

            if (!authState?.authenticated && inAuthGroup) {
                router.replace("/");
            } else if (authState?.authenticated === true && !inAuthGroup) {
                router.replace("/(protected)/home");
            }
        };
        checkAuth();
    }, [authState, onCheckAuth, segments, router]);

    return (
        <Stack screenOptions={{ headerTintColor: "black" }}>
            {!authState?.authenticated ? (
                <>
                    <Stack.Screen
                        name="index"
                        options={{
                            title: "login",
                        }}
                    />
                    <Stack.Screen name="register" />
                </>
            ) : (
                <Stack.Screen
                    name="(protected)"
                    options={{
                        headerShown: false,
                    }}
                />
            )}
        </Stack>
    );
};

const RootLayoutNav = () => {
    return (
        <AuthProvider>
            <StackLayout />
        </AuthProvider>
    );
};

export default RootLayoutNav;
