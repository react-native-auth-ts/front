import React, { useState } from "react";
import {
    Text,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const Page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { onLogin } = useAuth();

    const onLoginPress = async () => {
        if (!username || !password) return;
        onLogin!(username, password);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.header}>My App</Text>
            <TextInput
                autoCapitalize="none"
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputField}
            />

            <TouchableOpacity onPress={onLoginPress} style={styles.button}>
                <Text style={{ color: "#fff" }}>Sign in</Text>
            </TouchableOpacity>

            <Link href="/register">
                <Text style={{ textAlign: "center", color: "#111233" }}>
                    Don't have an account? Register
                </Text>
            </Link>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: "20%",
        justifyContent: "center",
    },
    header: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 40,
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 10,
    },
    button: {
        marginVertical: 15,
        alignItems: "center",
        backgroundColor: "#111233",
        padding: 12,
        borderRadius: 4,
    },
});
export default Page;
