import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fazendasAtom, pluviometersAtom, selectedFazendaAtom, selectedPluviometerAtom, selectedTalhaoAtom, talhoesAtom } from "../atoms/rainDataAtoms";

import BarChartComponent from "../components/BarChartComponent";
import BezierLineChart from "../components/BezierLineChart";
import CustomToast from '../components/CustomToast';
import PieChartComponent from "../components/LineChartComponent";
import { User } from '@supabase/supabase-js';
import styles from "../styles/styleRainData"
import { supabase } from "../lib/supabase";
import { useAtom } from "jotai";

const screenWidth = Dimensions.get("window").width;
const currentYear = new Date().getFullYear(); // Obtém o ano atual

export default function RainData() {
    // Refer to user
    const [user, setUser] = useState<User | null>(null);

    //Consult all data from db
    const [fazendas, setFazendas] = useAtom(fazendasAtom); // Lista de fazendas
    const [talhoes, setTalhoes] = useAtom(talhoesAtom); // Lista de talhões
    const [pluviometros, setPluviometros] = useAtom(pluviometersAtom); // Lista de pluviômetros

    // Options selected
    const [selectedMonth, setSelectedMonth] = useState("January"); // Mês selecionado pelo usuário
    const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Ano selecionado pelo usuário

    // Options selected
    const [selectedFazenda, setSelectedFazenda] = useAtom(selectedFazendaAtom);
    const [selectedTalhao, setSelectedTalhao] = useAtom(selectedTalhaoAtom);
    const [selectedPluviometro, setSelectedPluviometro] = useAtom(selectedPluviometerAtom);

    // Custom Toast
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<undefined | 'info' | 'error' | 'success'>(undefined);

    const showToast = (message: string, type?: 'info' | 'error' | 'success') => {
        setToastMessage(message);
        setToastVisible(true);

        setTimeout(() => {
            setToastVisible(false);
        }, 3000);

        setToastType(type);
    };

    // Convert selectedYear to a number
    const yearAsNumber: number = parseInt(selectedYear, 10);

    // Dessa forma da pra fazer operações matemáticas com o ano selecionado
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
            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoText}>Fazenda: {selectedFazenda?.nome}</Text>
                <Text style={styles.userInfoText}>Talhão: {selectedTalhao?.nome}</Text>
                <Text style={styles.userInfoText}>Pluviômetro: {selectedPluviometro?.nome}</Text>
            </View>

            <ScrollView>
                <View style={{ top: -180, width: '100%' }}>
                    {toastVisible && (
                        <CustomToast
                            message={toastMessage}
                            onHide={() => setToastVisible(false)}
                            type={toastType} // Fornece um valor padrão
                        />
                    )}
                </View>
                <View style={styles.bezierLineChartContainer}>
                    <Text>Quantidade de chuva por ano</Text>
                    <BezierLineChart />
                </View>

                <View style={styles.pieChartContainer}>
                    <Text>Quantidade de chuva por meses do ano</Text>
                    <PieChartComponent />
                </View>

                <View style={styles.barChartContainer}>
                    <Text>Quantidade de chuva por semana</Text>
                    <BarChartComponent />
                </View>

                <View style={styles.barChartContainer}>
                    <Text>Quantidade de chuva por dia</Text>
                    <BarChartComponent />
                </View>
            </ScrollView>
        </View>
    );
}