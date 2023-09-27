import { Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import CustomDatePicker from "../components/CustomDatePicker";
import CustomToast from "../components/CustomToast";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/styleReports";
import { supabase } from "../lib/supabase";

export default function Report() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<undefined | "info" | "error" | "success">(undefined);

    const [selectedFazenda, setSelectedFazenda] = useState("");
    const [selectedTalhao, setSelectedTalhao] = useState("");
    const [selectedPluviometer, setSelectedPluviometer] = useState("");
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [reportFormat, setReportFormat] = useState("pdf");

    const [fazendas, setFazendas] = useState<{ id: any; nome: any }[]>([]);
    const [talhoes, setTalhoes] = useState<{ id: any; nome: any }[]>([]);
    const [pluviometers, setPluviometers] = useState<{ id: any; nome: any }[]>([]);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Função para mostrar o CustomDatePicker
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const showCustomToast = (message: string, type?: "info" | "error" | "success") => {
        setToastMessage(message);
        setToastVisible(true);

        setTimeout(() => {
            setToastVisible(false);
        }, 3000);

        setToastType(type);
    };

    useEffect(() => {
        loadFazendas();
    }, []);

    const loadFazendas = async () => {
        try {
            const { data: fazendas, error } = await supabase.from("fazenda").select("id, nome");
            if (error) {
                showCustomToast("Erro ao consultar as fazendas:", "error");
            } else {
                setFazendas(fazendas || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de fazendas:", 'error');
        }
    };

    useEffect(() => {
        if (selectedFazenda) {
            loadTalhoes(selectedFazenda);
        }
    }, [selectedFazenda]);

    const loadTalhoes = async (fazendaId: any) => {
        try {
            const { data: talhoes, error } = await supabase
                .from("talhao")
                .select("id, nome")
                .eq("fazenda_id", fazendaId);
            if (error) {
                showCustomToast("Erro ao consultar os talhões:", 'error');
            } else {
                setTalhoes(talhoes || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de talhões:", 'error');
        }
    };

    useEffect(() => {
        if (selectedTalhao) {
            loadPluviometers(selectedTalhao);
        }
    }, [selectedTalhao]);

    const loadPluviometers = async (talhaoId: any) => {
        try {
            const { data: pluviometers, error } = await supabase
                .from("pluviometro")
                .select("id, nome")
                .eq("talhao_id", talhaoId);
            if (error) {
                showCustomToast("Erro ao consultar os pluviômetros:", 'error');
            } else {
                setPluviometers(pluviometers || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de pluviômetros:", 'error');
        }
    };

    useEffect(() => {
        setIsButtonDisabled(!(selectedPluviometer && selectedDay));
    }, [selectedPluviometer, selectedDay]);

    const openReportModal = () => {
        setModalVisible(true);
    };

    const closeReportModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.label}>Selecione a Fazenda:</Text>
                <Picker
                    selectedValue={selectedFazenda}
                    onValueChange={(itemValue) => setSelectedFazenda(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma fazenda..." value="" />
                    {fazendas.map((fazenda) => (
                        <Picker.Item key={fazenda.id} label={fazenda.nome} value={fazenda.id} />
                    ))}
                </Picker>
            </View>

            {selectedFazenda && (
                <View style={styles.section}>
                    <Text style={styles.label}>Selecione o Talhão:</Text>
                    <Picker
                        selectedValue={selectedTalhao}
                        onValueChange={(itemValue) => setSelectedTalhao(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione um talhão..." value="" />
                        {talhoes.map((talhao) => (
                            <Picker.Item key={talhao.id} label={talhao.nome} value={talhao.id} />
                        ))}
                    </Picker>
                </View>
            )}

            {selectedTalhao && (
                <View style={styles.section}>
                    <Text style={styles.label}>Selecione o Pluviômetro:</Text>
                    <Picker
                        selectedValue={selectedPluviometer}
                        onValueChange={(itemValue) => setSelectedPluviometer(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione um pluviômetro..." value="" />
                        {pluviometers.map((pluviometer) => (
                            <Picker.Item key={pluviometer.id} label={pluviometer.nome} value={pluviometer.id} />
                        ))}
                    </Picker>
                </View>
            )}

            {selectedPluviometer && (
                <View style={styles.dateContainer}>
                    <Text style={styles.dateLabel}>Selecione o Dia:</Text>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.dateText}>
                            {selectedDate ? selectedDate.toLocaleDateString() : 'Selecionar Data'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {isDatePickerVisible && (
                <CustomDatePicker
                    visible={isDatePickerVisible}
                    selectedDate={selectedDate}
                    onClose={() => setDatePickerVisible(false)}
                    onDateChange={(newDate) => {
                        setSelectedDate(newDate);
                        setDatePickerVisible(false);
                    }}
                />
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]}
                    onPress={openReportModal}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.buttonText}>Gerar Relatório</Text>
                </TouchableOpacity>
            </View>

            {/* Toast */}
            {toastVisible && (
                <CustomToast message={toastMessage} onHide={() => setToastVisible(false)} type={toastType} />
            )}
        </SafeAreaView>
    );
}