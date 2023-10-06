import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from 'victory-native';
import { alterFetchAtom, selectedPluviometerAtom } from '../../atoms/rainDataAtoms';

import RotatingArrowButton from '../RotatingArrowButton';
import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';

const screenWidth = Dimensions.get('window').width;

const mmToDm = (mm: number) => mm / 100; // Função para converter mm para dm
const mmToM = (mm: number) => mm / 1000; // Função para converter mm para m

const BezierLineChartYear = () => {
    const [selectedYear, setSelectedYear] = useState<string[]>([new Date().getFullYear().toString()]);
    const [precipitationData, setPrecipitationData] = useState<number[]>([]);
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [isPickerYearSelected, setIsPickerYearSelected] = useState('2023');
    const [precipitationByYear, setPrecipitationByYear] = useState<{ year: string; value: number }[]>([]);
    const [availableYears, setAvailableYears] = useState<string[]>([]);
    // Const para alterar o fetch
    const [alterFetch, setAlterFetch] = useAtom(alterFetchAtom)

    const [isRotating, setIsRotating] = useState(false);

    // Option selected
    const [selectedPluviometro, setSelectedPluviometro] = useAtom(selectedPluviometerAtom);

    const startRotation = () => {
        setIsRotating(true);
    };

    const stopRotation = () => {
        setIsRotating(false);
    };

    useEffect(() => {
        fetchPrecipitationData();
    }, [isRotating,])

    // Em algum momento da vida eu faco isso funcionar - Funcionou 
    useEffect(() => {
        const receivPrecip = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'precipitacao' },
                (payload) => {
                    console.log('Change received!', payload)
                    setAlterFetch(!alterFetch)
                    fetchPrecipitationData();
                }
            )
            .subscribe()
        return () => {
            receivPrecip.unsubscribe();
        }
    }, [])


    useEffect(() => {
        fetchPrecipitationData();
    }, []);


    const fetchPrecipitationData = async () => {
        try {
            const { data, error } = await supabase
                .from('precipitacao')
                .select('*')
                .eq('pluviometro_id', selectedPluviometro?.id);

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

    // Usar os arrays "labels" e "data" no gráfico
    const { labels, data } = precipitationByYear.reduce<{ labels: string[], data: number[] }>(
        (acc, item) => {
            acc.labels.push(item.year);
            acc.data.push(item.value);
            return acc;
        },
        { labels: [], data: [] }
    );

    // Função para converter valores de mm para dm ou m, dependendo do valor
    const convertValue = (value: number) => {
        if (value >= 1000) {
            return mmToM(value) + 'm';
        } else if (value >= 100) {
            return mmToDm(value) + 'dm';
        } else {
            return value + 'mm';
        }
    };

    return (
        <View style={styles.container}>
            <View >
                <RotatingArrowButton
                    onStartRotation={startRotation}
                    onStopRotation={stopRotation}
                    isRotating={isRotating}
                />
                <VictoryChart
                    width={380}
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
                            tickLabels: {
                                angle: 45,
                                fontSize: 12,
                                padding: 10,
                                fill: 'black',
                            },
                        }}
                    />
                    <VictoryAxis // Y
                        dependentAxis
                        tickValues={data}
                        tickFormat={(tick) => convertValue(tick)}
                        style={{
                            grid: {
                                stroke: 'blue',
                            },
                            tickLabels: {
                                angle: -45,
                                fontSize: 10,
                                padding: 5,
                                fill: 'black',
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
                        x={180}
                        y={20}
                        style={{
                            fill: 'white',
                            fontSize: 12,
                        }}
                    />
                </VictoryChart>
            </View>
        </View >
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
    viewModalYear: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        gap: 5,
    },
});

export default BezierLineChartYear;
