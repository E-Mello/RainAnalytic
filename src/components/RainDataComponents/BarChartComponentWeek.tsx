import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { selectedPluviometerAtom } from '../../atoms/rainDataAtoms';
import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';

const screenWidth = Dimensions.get('window').width;

const BarChartComponent: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string[]>([new Date().getFullYear().toString()]);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
    const [precipitationData, setPrecipitationData] = useState<number[]>([]);
    const [precipitationByWeek, setPrecipitationByWeek] = useState<
        { month: string; value: number }[]
    >([]);

    const months: { id: string; name: string }[] = [
        { id: "1", name: "Janeiro" },
        { id: "2", name: "Fevereiro" },
        { id: "3", name: "Marco" },
        { id: "4", name: "Abril" },
        { id: "5", name: "Maio" },
        { id: "6", name: "Junho" },
        { id: "7", name: "Julho" },
        { id: "8", name: "Agosto" },
        { id: "9", name: "Setembro" },
        { id: "10", name: "Outubro" },
        { id: "11", name: "Novembro" },
        { id: "12", name: "Dezembro" },
    ];


    // Option selected
    const [selectedPluviometro] = useAtom(selectedPluviometerAtom);

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

    const getAvailableYears = async () => {
        try {
            const response = await supabase
                .from('years_available')
                .select('*')
            const years = response?.data?.map((item: any) => item.ano) || [];

            if (response?.error) {
                console.error('Erro ao buscar anos disponíveis:', response.error);
            }

            return [...new Set(years)]; // Remover duplicatas usando Set
        } catch (error) {
            console.error('Erro ao buscar anos disponíveis:', error);
            return [];
        }
    };
    const fetchPrecipitationData = async () => {
        try {
            const years = await getAvailableYears();
            setSelectedYear(years); // Define os anos disponíveis no estado
        } catch (error) {
            console.error('Erro ao buscar anos disponíveis:', error);
        }
        try {
            const { data, error } = await supabase
                .from('precipitacao')
                .select('data, valor')
                .eq('pluviometro_id', selectedPluviometro?.id)
                .gte('data', `${selectedYear[0]}-01-01`)
                .lte('data', `${selectedYear[selectedYear.length - 1]}-12-31`);

            if (error) {
                console.error('Erro ao buscar dados de precipitação:', error);
                return;
            }

            if (data) {
                const formattedData = data.map((item: any) => ({
                    month: new Date(item.data).toLocaleString('default', { month: 'short' }),
                    value: item.valor,
                }));
                setPrecipitationByWeek(formattedData);
            }
        } catch (error) {
            console.error('Erro ao buscar dados de precipitação:', error);
        }
    };

    useEffect(() => {
        if (selectedYear && selectedMonth && selectedWeek) {
            fetchPrecipitationData();
        }
    }, [selectedYear, selectedMonth, selectedWeek]);


    // Usar os arrays "labels" e "data" no gráfico
    const { labels, data } = precipitationByWeek.reduce<{ labels: string[], data: number[] }>(
        (acc, item) => {
            acc.labels.push(item.month);
            acc.data.push(item.value);
            return acc;
        },
        { labels: [], data: [] }
    );

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    style={styles.picker}
                >
                    {/* Replace with your logic to fetch available years */}
                    <Picker.Item label="Select Year" value={null} />
                    {selectedYear.map((item) => (
                        <Picker.Item key={item} label={item} value={item} />
                    ))}
                </Picker>

                {selectedYear && (
                    <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                        style={styles.picker}
                    >
                        {/* Replace with your logic to fetch available months for the selected year */}
                        <Picker.Item label="Select Month" value={null} />
                        {months.map((item) => (
                            <Picker.Item key={item.id} label={item.name} value={item.id} />
                        ))}
                    </Picker>
                )}

                {selectedYear && selectedMonth && (
                    <Picker
                        selectedValue={selectedWeek}
                        onValueChange={(itemValue) => setSelectedWeek(itemValue)}
                        style={styles.picker}
                    >
                        {/* Replace with your logic to fetch available weeks for the selected year and month */}
                        <Picker.Item label="Select Week" value={null} />
                        <Picker.Item label="Week 1" value="Week 1" />
                        {/* Add other weeks here */}
                    </Picker>
                )}
            </View>

            {precipitationData.length > 0 && (
                <BarChart
                    data={{
                        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
                        datasets: [
                            {
                                data: precipitationData,
                            },
                        ],
                    }}
                    width={screenWidth}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix="m"
                    yAxisInterval={1}
                    chartConfig={chartConfig}
                    style={styles.barChart}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        flexDirection: 'row', // Arrange pickers horizontally
    },
    picker: {
        height: 50,
        paddingLeft: 130,
        padding: 1,
    },
    barChart: {
        borderRadius: 16,
    },
});

export default BarChartComponent;
