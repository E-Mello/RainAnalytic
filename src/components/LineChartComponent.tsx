import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const LineChartComponent = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

    const chartConfig = {
        backgroundColor: "#007AFF",
        backgroundGradientFrom: "#007AFF",
        backgroundGradientTo: "#0b3e744b",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
            padding: 5,
        },
        propsForDots: {
            r: "4",
            strokeWidth: "1",
            stroke: "#000000"
        }
    };

    useEffect(() => {
        // Additional logic if needed
    }, [selectedYear]);

    const exampleData = [100, 60, 40, 30, 90, 100, 80, 120, 90, 140, 110, 60];

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
                style={{ height: 50, width: 150 }}
            >
                {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map(
                    (year) => (
                        <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                    )
                )}
            </Picker>
            <LineChart
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            data: exampleData,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={385}
                height={220}
                yAxisLabel=" "
                yAxisSuffix="m"
                chartConfig={chartConfig}
                style={styles.lineChart}
                decorator={() => {
                    return (
                        <View>
                            {/* <Text>BezierLineChart Decorator</Text> */}
                        </View>
                    );
                }}
            />
            {/* <Text>Selected Year: {selectedYear}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineChart: {
        borderRadius: 16,
        padding: 2,
    },
});

export default LineChartComponent;
