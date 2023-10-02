import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from 'victory-native';

import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { selectedPluviometerAtom } from '../../atoms/rainDataAtoms';
import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';

const screenWidth = Dimensions.get('window').width;


const BezierLineChartYear = () => {
    const [selectedYear, setSelectedYear] = useState<string[]>([new Date().getFullYear().toString()]);
    const [precipitationData, setPrecipitationData] = useState<number[]>([]);
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [isPickerYearSelected, setIsPickerYearSelected] = useState('2023');
    const [precipitationByYear, setPrecipitationByYear] = useState<{ year: string; value: number }[]>([]);


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

            const { data, error } = await supabase
                .from('precipitacao')
                .select('*')
                .eq('pluviometro_id', selectedPluviometro?.id)

            if (error) {
                console.error('Erro ao buscar dados de precipitação:', error);
                return;
            }

            if (data) {
                // Agrupar os valores por ano
                const groupedData: { [year: string]: number } = {};
                data.forEach((item: any) => {
                    const year = item.data.substring(0, 4); // Extrair o ano da data
                    if (groupedData[year]) {
                        groupedData[year] += item.valor;
                    } else {
                        groupedData[year] = item.valor;
                    }
                });

                // Converter os dados agrupados em um array de objetos
                const precipitationValues = Object.keys(groupedData).map((year) => ({
                    year,
                    value: groupedData[year],
                }));

                setPrecipitationByYear(precipitationValues);
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


    // Usar os arrays "labels" e "data" no gráfico
    const { labels, data } = precipitationByYear.reduce<{ labels: string[], data: number[] }>(
        (acc, item) => {
            acc.labels.push(item.year);
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
            <VictoryChart
                width={385}
                height={220}
                padding={{ top: 10, bottom: 40, left: 50, right: 20 }} // Ajuste o padding conforme necessário
                domainPadding={10} // Ajuste o espaçamento entre os pontos de dados
            >
                <VictoryAxis
                    tickValues={labels} // Defina os valores do eixo X
                    tickFormat={(tick) => `${tick}`} // Formate os rótulos do eixo X conforme necessário
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 },
                    }}
                    style={{
                        grid: {
                            stroke: 'black', // Cor das linhas de grade
                        },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={data} // Formate os rótulos do eixo Y conforme necessário
                    style={{
                        grid: {
                            stroke: 'black', // Cor das linhas de grade
                        },
                    }}
                />
                <VictoryLine
                    data={precipitationByYear}
                    x="year"
                    y="value"
                    style={{
                        data: {
                            stroke: '#db3f3f', // Cor da linha
                            strokeWidth: 2, // Largura da linha
                        },
                    }}
                />
                <VictoryLabel
                    text="BezierLineChart Decorator"
                    x={180} // Ajuste a posição do texto conforme necessário
                    y={20} // Ajuste a posição do texto conforme necessário
                    style={{
                        fill: 'white', // Cor do texto
                        fontSize: 12, // Tamanho da fonte
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

export default BezierLineChartYear;