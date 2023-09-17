import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    section: {
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
    },
    picker: {
        backgroundColor: 'white',
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        fontSize: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    dateLabel: {
        fontSize: 18,
        color: '#333',
    },
    dateText: {
        fontSize: 18,
        color: '#007AFF',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default styles;