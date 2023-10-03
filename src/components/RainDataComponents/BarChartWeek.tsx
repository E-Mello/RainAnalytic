import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';

import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const BarChartWeek: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
    const [yearsAvailable, setYearsAvailable] = useState<string[]>([]);
    const [monthsWithPrecipitation, setMonthsWithPrecipitation] = useState<string[]>([]);
    const [precipitationData, setPrecipitationData] = useState<number[]>([]);
    const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

    const getAvailableYears = async () => {
        // Simulando busca de anos disponíveis no banco de dados
        const availableYears = ["2022", "2023", "2024"];
        setYearsAvailable(availableYears);
    };

    const getMonthsWithPrecipitation = async () => {
        // Simulando busca de meses com precipitação com base no ano selecionado
        if (selectedYear) {
            const availableMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            setMonthsWithPrecipitation(availableMonths);
        }
    };

    const generateRandomData = () => {
        // Gerar dados aleatórios para o gráfico (apenas para fins de demonstração)
        const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        const data = daysOfWeek.map((day) => ({
            x: day,
            y: Math.floor(Math.random() * 50 + 10), // Gerar valores aleatórios
        }));
        setChartData(data);
    };

    // Função para gerar as opções de semana com base no mês selecionado
    const generateWeekOptions = () => {
        if (selectedMonth) {
            const daysInMonth = new Date(Number(selectedYear), Number(selectedMonth), 0).getDate();
            const weeks = Math.ceil(daysInMonth / 7);

            const weekOptions = Array.from({ length: weeks }, (_, index) => ({
                label: `Semana ${index + 1}`,
                value: `Semana ${index + 1}`,
            }));

            return weekOptions;
        }

        return [];
    };

    useEffect(() => {
        getAvailableYears();
    }, []);

    useEffect(() => {
        getMonthsWithPrecipitation();
    }, [selectedYear]);

    useEffect(() => {
        if (selectedYear && selectedMonth && selectedWeek) {
            generateRandomData();
        }
    }, [selectedYear, selectedMonth, selectedWeek]);

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione o Ano" value={null} />
                    {yearsAvailable.map((year) => (
                        <Picker.Item key={year} label={year} value={year} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione o Mês" value={null} />
                    {monthsWithPrecipitation.map((month) => (
                        <Picker.Item key={month} label={`Mês ${month}`} value={month} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedWeek}
                    onValueChange={(itemValue) => setSelectedWeek(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione a Semana" value={null} />
                    {generateWeekOptions().map((weekOption) => (
                        <Picker.Item key={weekOption.value} label={weekOption.label} value={weekOption.value} />
                    ))}
                </Picker>
            </View>

            {chartData.length > 0 && (
                <VictoryChart width={screenWidth} height={220} padding={{ top: 20, bottom: 40, left: 40, right: 20 }}>
                    <VictoryAxis
                        tickValues={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
                        tickFormat={(t) => t}
                        style={{ axisLabel: { padding: 30 } }}
                    />
                    <VictoryAxis dependentAxis
                        //tickFormat={(t) => `${t} mm`} // Aparecer "mm" após os valores do eixo Y
                        style={{ axisLabel: { padding: 40 } }}
                    />
                    <VictoryBar
                        data={chartData}
                        x="x"
                        y="y"
                        style={{ data: { fill: 'blue' } }}
                    />
                </VictoryChart>
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
});

export default BarChartWeek;
