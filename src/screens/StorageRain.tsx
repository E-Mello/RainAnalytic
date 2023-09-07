import { ScrollView, StyleSheet, Text, View } from "react-native";

import PieChartComponent from "../components/LineChartComponent";

export default function StorageRain() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.pieChartContainer}>
                    <Text>Armazenamento de agua</Text>
                    <PieChartComponent />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    pieChartContainer: {
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        alignItems: "center",
    },
})