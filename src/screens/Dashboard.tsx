import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, {
    useEffect,
    useState
} from "react";

import { Picker } from '@react-native-picker/picker';
import { User } from '@supabase/supabase-js';
import { supabase } from "../lib/supabase";

const screenWidth = Dimensions.get("window").width;

export default function Feed() {
    const [user, setUser] = useState<User | null>(null);
    const [selectedMonth, setSelectedMonth] = useState("January"); // Mês selecionado pelo usuário

    useEffect(() => {
        // Função assíncrona para buscar os detalhes do usuário
        async function fetchUser() {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                setUser(user);
                if (error) {
                    console.log(error);
                };
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        }

        fetchUser(); // Chama a função para buscar os detalhes do usuário
    }, []); // O segundo argumento [] assegura que useEffect seja chamado apenas uma vez

    // Dados de exemplo (substitua pelos dados reais do banco de dados no futuro)
    const exampleRainData = [
        [30, 50, 10, 70, 40, 90],
        [40, 60, 20, 80, 50, 100],
        [50, 70, 30, 90, 60, 110],
        [60, 80, 40, 100, 70, 120]
    ]; // Exemplo de dados de chuva diária por mês

    const exampleWeeklyRainData = [200, 250, 150, 300, 350, 400, 450]; // Exemplo de dados de chuva semanal

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue: React.SetStateAction<string>) => setSelectedMonth(itemValue)}
                style={{ height: 50, width: 150 }}
            >
                <Picker.Item label="January" value="January" />
                <Picker.Item label="February" value="February" />
                <Picker.Item label="March" value="March" />
                {/* Adicione os outros meses conforme necessário */}
            </Picker>

            <Text>Chuva Diária</Text>
            <LineChart
                data={{
                    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
                    datasets: [
                        {
                            data: exampleRainData[0] // Usando os dados do primeiro mês
                        }
                    ]
                }}
                width={screenWidth}
                height={220}
                yAxisLabel="mm"
                chartConfig={chartConfig}
            />

            <Text>Chuva Semanal</Text>
            <BarChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k" // Adicione esta linha
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});