import { StyleSheet } from "react-native-windows";

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.792)',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '95%',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: '60%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 16,
        width: '100%',
    },
    closeButton: {
        width: '10%',
    },
    titleView: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlignVertical: 'center',
        width: '90%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '70%',
        left: '7%',
    },
    content: {
        paddingTop: 10,
        justifyContent: 'space-between',
        gap: 25,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    saveButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginTop: 16,
        alignSelf: 'center',
    },

    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default styles;
