import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import BarChartComponent from "../components/BarChartComponent";
import BezierLineChart from "../components/BezierLineChart";
import PieChartComponent from "../components/LineChartComponent";
import { User } from '@supabase/supabase-js';
import { supabase } from "../lib/supabase";

const screenWidth = Dimensions.get("window").width;
const currentYear = new Date().getFullYear(); // Obtém o ano atual

export default function RainData() {
    const [user, setUser] = useState<User | null>(null);
    const [selectedMonth, setSelectedMonth] = useState("January"); // Mês selecionado pelo usuário
    const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Ano selecionado pelo usuário

    // Convert selectedYear to a number
    const yearAsNumber: number = parseInt(selectedYear, 10);

    // Now you can perform arithmetic operations on yearAsNumber
    const nextYear: number = yearAsNumber + 1;

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

    return (
        <View style={styles.container} >
            <ScrollView>
                <View style={styles.bezierLineChartContainer}>
                    <Text>Quantidade de chuva por meses do ano</Text>
                    <BezierLineChart />
                </View>

                {/* <View style={styles.pieChartContainer}>
                    <Text>Componente Pie Chart</Text>
                    <PieChartComponent />
                </View> */}

                <View style={styles.barChartContainer}>
                    <Text>Quantidade de chuva durante o dia</Text>
                    <BarChartComponent />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#ffffff',

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    bezierLineChartContainer: {
        paddingTop: 10,
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        alignItems: "center",
    },
    barChartContainer: {
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        alignItems: "center",
        paddingTop: 50,
    },
});
