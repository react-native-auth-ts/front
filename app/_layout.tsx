import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const StackLayout = () => {
    const { authState } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(protected)";

        if (!authState?.authenticated && inAuthGroup) {
            router.replace("/");
        } else if (authState?.authenticated === true) {
            router.replace("/(protected)/home");
        }
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
