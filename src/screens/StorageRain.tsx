import { ScrollView, StyleSheet, Text, View } from "react-native";

import PieChartComponent from "../components/LineChartComponent";
import styles from "../styles/styleStorageRain";

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
