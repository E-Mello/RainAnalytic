// styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        margin: 25,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        height: 400,
        justifyContent: 'space-between',
        top: 30,
        
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    calendarIcon: {
        marginLeft: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    button: {
        backgroundColor: 'blue', // Defina a cor desejada aqui
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    calendar: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        zIndex: 1000,
        flex: 1,
    }
});

export default styles;
