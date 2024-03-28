import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const StackLayout = () => {
    const { authState } = useAuth();
    const { onCheckAuth } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const inAuthGroup = segments[0] === "(protected)";
            const token = await SecureStore.getItemAsync("token");

            if (token && authState?.authenticated === false) {
                onCheckAuth!();
                console.log("checking auth");
            }
            if (!authState?.authenticated && inAuthGroup) {
                router.replace("/");
            } else if (authState?.authenticated === true) {
                router.replace("/(protected)/home");
            }
        };
        checkAuth();
    }, [authState]);

    return (
        <Stack screenOptions={{ headerTintColor: "black" }}>
            <Stack.Screen
                name="index"
                options={{
                    title: "login",
                }}
            />
            <Stack.Screen name="register" />
            <Stack.Screen
                name="(protected)"
                options={{
                    headerShown: false,
                }}
            />
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
