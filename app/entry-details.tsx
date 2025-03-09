import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Entry Details Screen.</Text>
            <Link href="/entry-details">Go to Home</Link>
        </View>
    );
}
