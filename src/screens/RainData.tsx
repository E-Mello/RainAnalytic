import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import BarChartComponent from "../components/BarChartComponent";
import BezierLineChart from "../components/BezierLineChart";
import PieChartComponent from "../components/LineChartComponent";
import { User } from '@supabase/supabase-js';
import styles from "../styles/styleRainData"
import { supabase } from "../lib/supabase";

const screenWidth = Dimensions.get("window").width;
const currentYear = new Date().getFullYear(); // Obtém o ano atual

export default function RainData() {
    const [user, setUser] = useState<User | null>(null);
    const [selectedMonth, setSelectedMonth] = useState("January"); // Mês selecionado pelo usuário
    const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Ano selecionado pelo usuário
    const [selectedFazenda, setSelectedFazenda] = useState("");
    const [selectedTalhao, setSelectedTalhao] = useState("");
    const [selectedPluviometro, setSelectedPluviometro] = useState("");

    // useEffect(() => {
    //     // Função assíncrona para buscar os detalhes da fazenda, talhão e pluviômetro
    //     async function fetchFazendaInfo() {
    //         try {
    //             // Consulta SQL para buscar informações da fazenda, talhão e pluviômetro
    //             const { data, error } = await supabase
    //                 .from("projeto.fazenda")
    //                 .select("nome")
    //                 .eq("id", 1); // Supondo que você queira informações da Fazenda com ID 1

    //             if (error) {
    //                 console.error("Erro ao buscar informações:", error);
    //                 return;
    //             }

    //             // Define os estados com os dados recuperados
    //             setSelectedFazenda(data[0]?.nome || "Fazenda Luzia"); // Define um valor padrão se não houver dados
    //             setSelectedTalhao("Talhão A"); // Define um valor padrão
    //             setSelectedPluviometro("Pluviômetro 1"); // Define um valor padrão
    //         } catch (error) {
    //             console.error("Erro ao buscar informações da fazenda:", error);
    //         }
    //     }

    //     fetchFazendaInfo(); // Chama a função para buscar os detalhes da fazenda, talhão e pluviômetro
    // }, []); // O segundo argumento [] assegura que useEffect seja chamado apenas uma vez

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
        <View style={styles.container}>
            {/* View para mostrar fazenda, talhão e pluviômetro */}
            {/* <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoText}>Fazenda: {selectedFazenda}</Text>
                <Text style={styles.userInfoText}>Talhão: {selectedTalhao}</Text>
                <Text style={styles.userInfoText}>Pluviômetro: {selectedPluviometro}</Text>
            </View> */}

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