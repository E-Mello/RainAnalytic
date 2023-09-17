import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    datePickerContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalSubTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    dateSelectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    dateInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    dateInputLabel: {
        marginRight: 8,
    },
    dateInputAndIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 55,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 5,
        width: 55,
        textAlign: 'center',
    },
    dateInputIcon: {
        marginLeft: 5,
    },
    dateSelectionButton: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    buttonText: {
        fontSize: 18,
        color: 'blue',
    },
    datePicker: {
        backgroundColor: 'white',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      datePickerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      picker: {
        height: 50,
      },
      cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
      },
      confirmButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        flex: 1,
      },
});

export default styles;
