import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const BarChartComponent: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState('1');

    const chartConfig = {
        backgroundColor: "#007AFF",
        backgroundGradientFrom: "#0b3e744b",
        backgroundGradientTo: "#007AFF",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
            padding: 5,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '5',
            stroke: '#ffa726',
        },
    };

    const exampleData = [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
    ];

    useEffect(() => {
        // Additional logic if needed
    }, [selectedDay]);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedDay}
                onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
                style={{ height: 50, width: 150 }}
            >
                {Array.from({ length: 31 }, (_, i) => (i + 1).toString()).map((day) => (
                    <Picker.Item key={day} label={day} value={day} />
                ))}
            </Picker>
            <BarChart
                data={{
                    labels: ['00:01 - 06:00', '06:01 - 12:00', '12:01 - 18:00', '18:01 - 00:00'],
                    datasets: [
                        {
                            data: exampleData,
                        },
                    ],
                }}
                width={385}
                height={220}
                yAxisLabel=""
                yAxisSuffix="m"
                yAxisInterval={1}
                chartConfig={chartConfig}
                style={styles.barChart}
            />
            {/* <Text>Selected Day: {selectedDay}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barChart: {
        borderRadius: 16,
        paddingLeft: 2,
    },
});

export default BarChartComponent;
