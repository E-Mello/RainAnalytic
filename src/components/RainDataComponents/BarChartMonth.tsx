import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory-native';
import { alterFetchAtom, selectedPluviometerAtom } from '../../atoms/rainDataAtoms';

import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';

const BezierBarChartMonth = () => {
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [precipitationByMonth, setPrecipitationByMonth] = useState<
        { month: string; value: number }[]
    >([]);
    const [availableYears, setAvailableYears] = useState<string[]>([]);

    //Const para alterar o fetch
    const [alterFetch, setAlterFetch] = useAtom(alterFetchAtom)

    // Option selected
    const [selectedPluviometro] = useAtom(selectedPluviometerAtom);

    useEffect(() => {
        getAvailableYears().then((years) => {
            setAvailableYears(years);
        });
    }, []);

    useEffect(() => {
        fetchPrecipitationData();
    }, [alterFetch]);

    useEffect(() => {
        fetchPrecipitationData();
    }, [selectedYear]);


    useEffect(() => {
        fetchPrecipitationData();
    }, [alterFetch]);

    const toggleYearPicker = async () => {
        setIsYearPickerVisible(!isYearPickerVisible);
    };

    const getAvailableYears = async () => {
        try {
            const response = await supabase
                .from('years_available')
                .select('*')
            const years = response?.data?.map((item: any) => item.ano.toString()) || [];

            if (response?.error) {
                console.error('Erro ao buscar anos disponíveis:', response.error);
            }

            return [...new Set(years)];
        } catch (error) {
            console.error('Erro ao buscar anos disponíveis:', error);
            return [];
        }
    };

    const fetchPrecipitationData = async () => {
        try {
            const { data, error } = await supabase
                .from('precipitacao')
                .select('data, valor')
                .eq('pluviometro_id', selectedPluviometro?.id)
                .gte('data', `${selectedYear}-01-01`)
                .lte('data', `${selectedYear}-12-31`);

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
                    <View style={styles.selectorYear}>
                        <ScrollView contentContainerStyle={styles.pickerContainer}>
                            {availableYears.map((year) => (
                                <TouchableOpacity
                                    key={year}
                                    style={[
                                        styles.yearOption,
                                        selectedYear === year && styles.selectedYearOption,
                                    ]}
                                    onPress={() => {
                                        setSelectedYear(year);
                                        toggleYearPicker();
                                    }}
                                >
                                    <Text>{year}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleYearPicker}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={toggleYearPicker}>
                <Text>Year: {selectedYear}</Text>
            </TouchableOpacity>
            <VictoryChart
                width={385}
                height={220}
                padding={{ top: 10, bottom: 40, left: 50, right: 20 }}
                domainPadding={10}
            >

                <VictoryAxis // X
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

                <VictoryAxis // Y
                    tickValues={data}
                    dependentAxis
                    tickFormat={(tick) => `${tick}`}
                    style={{
                        grid: {
                            stroke: 'white',
                        },
                    }}
                    origin={{ x: 0, y: 0 }}
                />
                <VictoryBar
                    data={precipitationByMonth}
                    x="month"
                    y="value"
                    style={{
                        data: {
                            fill: '#db3f3f',
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
        borderColor: 'black',
    },
    yearOption: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    selectorYear: {
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
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
        width: '30%',
        alignSelf: 'center',
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default BezierBarChartMonth;
