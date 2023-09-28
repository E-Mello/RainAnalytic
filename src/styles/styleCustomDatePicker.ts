// styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        margin: 25,
        height: 400,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        top: 30,
        
    },
    headerView: {
        alignItems: 'center',
        width: '95%',
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    closeIconContainer: {
        position: 'absolute',
        top: 10, // Adjust the top position as needed to position the icon
        zIndex: 1000, // Adjust the z-index as needed to ensure it's above other elements
        end: 0,
        width: '10%',
        right: 0,
    },
      closeIcon: {
        fontSize: 20, // Adjust the font size as needed
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        width: '90%',
    },
    inputContainer: {
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    viewTextInputContainer: {
        flexDirection: 'column',
        paddingBottom: 10,
        gap: 5,
    },
    textInput: {
    },
    input: {
        width: 250,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    calendarIcon: {
        marginLeft: 5,
        fontSize: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: -5,
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
        height: 320,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        zIndex: 1000,
        flex: 1,
        top:5,
        fontSize: 30,
    },
    calendarView: {
        position: 'absolute',
        top: 25,
    },
});

export default styles;
