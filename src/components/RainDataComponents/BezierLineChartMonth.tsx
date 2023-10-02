import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from 'victory-native';

import { Picker } from '@react-native-picker/picker';
import { selectedPluviometerAtom } from '../../atoms/rainDataAtoms';
import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';

const BezierLineChartMonth = () => {
    const [selectedYear, setSelectedYear] = useState<string[]>([new Date().getFullYear().toString()]);
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [precipitationByMonth, setPrecipitationByMonth] = useState<
        { month: string; value: number }[]
    >([]);
    const [isPickerYearSelected, setIsPickerYearSelected] = useState('2023');
    const [availableYears, setAvailableYears] = useState<string[]>([]);

    // Option selected
    const [selectedPluviometro] = useAtom(selectedPluviometerAtom);

    useEffect(() => {
        fetchPrecipitationData();
    }, []);

    const toggleYearPicker = async () => {
        setIsYearPickerVisible(!isYearPickerVisible);

        if (isYearPickerVisible && availableYears.length === 0) {
            // Buscar os anos disponíveis somente quando o modal estiver visível
            const years = await getAvailableYears();
            setAvailableYears(years);
        }
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
                setPrecipitationByMonth(formattedData);
            }
        } catch (error) {
            console.error('Erro ao buscar dados de precipitação:', error);
        }
    };

    // Usar os arrays "labels" e "data" no gráfico
    const { labels, data } = precipitationByMonth.reduce<{ labels: string[], data: number[] }>(
        (acc, item) => {
            acc.labels.push(item.month);
            acc.data.push(item.value);
            return acc;
        },
        { labels: [], data: [] }
    );

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isYearPickerVisible}
                onRequestClose={toggleYearPicker}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                        {availableYears.map((year) => (
                            <TouchableOpacity
                                key={year}
                                style={[
                                    styles.yearOption,
                                    selectedYear.includes(year.toString()) && styles.selectedYearOption,
                                ]}
                                onPress={() => {
                                    setSelectedYear([year.toString()]); // Defina selectedYear como uma matriz com um único ano
                                    toggleYearPicker();
                                }}
                            >
                                <Text>{year.toString()}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={toggleYearPicker}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Picker
                selectedValue={isPickerYearSelected}
                onValueChange={(itemValue, itemIndex) => setIsPickerYearSelected(itemValue)}
                style={{ height: 50, width: 150 }}
            >
                {availableYears.map((year) => (
                    <Picker.Item key={year} label={year} value={year} />
                ))}
            </Picker>
            <VictoryChart
                width={385}
                height={220}
                padding={{ top: 10, bottom: 40, left: 50, right: 20 }}
                domainPadding={10}
            >
                <VictoryAxis
                    // x-axis
                    tickValues={labels}
                    tickFormat={(tick) => `${tick}`}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 },
                    }}
                    style={{
                        grid: {
                            stroke: 'black',
                        },
                    }}
                />

                <VictoryAxis
                    // y-axis
                    tickValues={data}
                    dependentAxis
                    tickFormat={(tick) => `${tick}m`}
                    style={{
                        grid: {
                            stroke: 'blue',
                        },
                    }}
                    origin={{ x: 0, y: 0 }}
                />
                <VictoryLine
                    data={precipitationByMonth}
                    x="month"
                    y="value"
                    style={{
                        data: {
                            stroke: '#db3f3f',
                            strokeWidth: 2,
                        },
                    }}
                />
                <VictoryLabel
                    text="Precipitation by Month"
                    x={180}
                    y={20}
                    style={{
                        fill: 'white',
                        fontSize: 12,
                    }}
                />
            </VictoryChart>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    yearOption: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    selectedYearOption: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});

export default BezierLineChartMonth;
