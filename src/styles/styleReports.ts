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
        marginRight: 16,
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
    dateDisplayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap:5,
        justifyContent:'space-between',
        width:'100%'
    },
    generateReportButton: {
        backgroundColor: '#007AFF', // Cor de fundo do botão (azul neste exemplo)
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    generateReportButtonText: {
        color: '#FFFFFF', // Cor do texto do botão (branco neste exemplo)
        fontSize: 18,
        fontWeight: 'bold',
    },
    reportContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff', // Cor de fundo do container
      },
      formatButton: {
        backgroundColor: '#007AFF', // Cor de fundo do botão
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 16,
      },
      formatButtonText: {
        color: '#fff', // Cor do texto do botão
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      excelButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
      },
      excelButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
      },
      modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 20,
      },
      modalButton: {
        backgroundColor: "#007bff", // Cor de fundo do botão
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
      },
      modalButtonText: {
        color: "#fff", // Cor do texto do botão
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
      },
      modalCloseButton: {
        backgroundColor: "#ccc", // Cor de fundo do botão de fechar
        padding: 10,
        borderRadius: 5,
        width: "80%",
      },
      modalCloseButtonText: {
        color: "#333", // Cor do texto do botão de fechar
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
      },
});

export default styles;