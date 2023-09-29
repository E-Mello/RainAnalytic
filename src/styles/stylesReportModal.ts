import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '80%',
    },
    pdfButton: {
        backgroundColor: '#007bff',
    },
    csvButton: {
        backgroundColor: '#4CAF50',
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalCloseButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        marginTop: 20,
    },
    modalCloseButtonText: {
        color: '#333',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
