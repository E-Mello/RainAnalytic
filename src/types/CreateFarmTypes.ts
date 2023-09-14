import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    errorText: {
        color: 'red',
    },
});

export default styles;