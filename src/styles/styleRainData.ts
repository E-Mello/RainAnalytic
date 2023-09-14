import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    bezierLineChartContainer: {
        paddingTop: 10,
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        alignItems: "center",
    },
    barChartContainer: {
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        alignItems: "center",
        paddingTop: 50,
    },
    userInfoContainer: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        width: "100%",
        alignItems: "center",
    },
    userInfoText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
});

export default styles;