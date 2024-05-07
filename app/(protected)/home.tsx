import { StyleSheet, Text, View, Pressable } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
export default function Page() {
    const { Logout } = useAuth();
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.subtitle}>This is the dashboard index</Text>
                <Pressable
                    onPress={() => {
                        Logout!();
                    }}
                >
                    <Text>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    subtitle: {
        fontSize: 36,
        color: "#38434D",
    },
});
