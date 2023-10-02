import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { selectedPluviometerAtom } from '../../atoms/rainDataAtoms';
import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';

const screenWidth = Dimensions.get('window').width;

type PeriodType = "ano" | "mes" | "semana";

const BezierLineChart = ({ period }: { period: PeriodType }) => {
    const [selectedYear, setSelectedYear] = useState<string[]>([new Date().getFullYear().toString()]);
    const [precipitationData, setPrecipitationData] = useState<number[]>([]);
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [isPickerYearSelected, setIsPickerYearSelected] = useState('2023');

    // Option selected
    const [selectedPluviometro, setSelectedPluviometro] = useAtom(selectedPluviometerAtom);

    const chartConfig = {
        backgroundColor: "#007AFF",
        backgroundGradientFrom: "#007AFF",
        backgroundGradientTo: "#0b3e744b",
        decimalPlaces: 2,
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
        getAvailableYears();
    }, []);


    useEffect(() => {
        fetchPrecipitationData();
    }, []);

    // Função para obter todos os anos disponíveis na tabela de precipitação
    const getAvailableYears = async () => {
        try {
            const response = await supabase
                .from('years_available')
                .select('*')
            setSelectedYear(response?.data?.map((item: any) => item.ano) || []);

            if (response?.error) {
                console.error('Erro ao buscar anos disponíveis:', response.error);
                return [];
            }

            const availableYears = response?.data?.map((item: any) => item.ano) || [];
            return [...new Set(availableYears)]; // Remover duplicatas usando Set
        } catch (error) {
            console.error('Erro ao buscar anos disponíveis:', error);
            return [];
        }
    };


    const fetchPrecipitationData = async () => {
        try {
            if (period === "ano") {
                const { data, error } = await supabase
                    .from('precipitacao')
                    .select('*')
                    .eq('pluviometro_id', selectedPluviometro?.id)
                    .lte('data', `${isPickerYearSelected}-12-31`)
                    .gte('data', `${isPickerYearSelected}-01-01`)
                console.log(data);
                console.log(error);

            } else if (period === "mes") {
                // Fazer dps
            } else if (period === "semana") {
                // Fazer dps
            }
        } catch (error) {
            console.error('Erro ao buscar dados de precipitação:', error);
        }
    };


    const toggleYearPicker = () => {
        setIsYearPickerVisible(!isYearPickerVisible);
    };

    const handleYearSelection = (year: string) => {
        const updatedYears = selectedYear.includes(year)
            ? selectedYear.filter((selectedYear) => selectedYear !== year)
            : [...selectedYear, year];
        setSelectedYear(updatedYears);
    };

    const exampleData = [100, 60, 40, 30, 90, 100, 80, 120, 90, 140, 110, 60];

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
                        {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map(
                            (year) => (
                                <TouchableOpacity
                                    key={year}
                                    style={[
                                        styles.yearOption,
                                        selectedYear.includes(year.toString()) && styles.selectedYearOption,
                                    ]}
                                    onPress={() => handleYearSelection(year.toString())}
                                >
                                    <Text>{year.toString()}</Text>
                                </TouchableOpacity>
                            )
                        )}
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
                {selectedYear.map((year) => (
                    <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                ))}
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
                bezier
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

export default BezierLineChart;