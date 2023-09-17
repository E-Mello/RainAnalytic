import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { Calendar } from "react-native-calendars";
import CustomToast from "../CustomToast";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../../lib/supabase";

export default function RegisterPrecipitation() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<undefined | "info" | "error" | "success">(undefined);

    const [fazendas, setFazendas] = useState<{ id: any; nome: any }[]>([]);
    const [selectedFazenda, setSelectedFazenda] = useState("");
    const [talhoes, setTalhoes] = useState<{ id: any; nome: any }[]>([]);
    const [selectedTalhao, setSelectedTalhao] = useState("");
    const [pluviometers, setPluviometers] = useState<{ id: any; nome: any }[]>([]);
    const [selectedPluviometer, setSelectedPluviometer] = useState("");
    const [precipitationValue, setPrecipitationValue] = useState("");
    const [precipitationDate, setPrecipitationDate] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const showCustomToast = (message: string, type?: "info" | "error" | "success") => {
        setToastMessage(message);
        setToastVisible(true);

        setTimeout(() => {
            setToastVisible(false);
        }, 3000);

        setToastType(type);
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: "onBlur" });

    const loadFazendas = async () => {
        try {
            const { data: fazendas, error } = await supabase.from("fazenda").select("id, nome");
            if (error) {
                showCustomToast("Erro ao consultar o banco de dados de fazendas", "error");
            } else {
                setFazendas(fazendas || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de fazendas", "error");
        }
    };

    const loadTalhoes = async (fazendaId: any) => {
        try {
            const { data: talhoes, error } = await supabase.from("talhao").select("id, nome").eq("fazenda_id", fazendaId);
            if (error) {
                showCustomToast("Erro ao consultar o banco de dados de talhões", "error");
            } else {
                setTalhoes(talhoes || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de talhões", "error");
        }
    };

    const loadPluviometers = async (talhaoId: any) => {
        try {
            const { data: pluviometers, error } = await supabase.from("pluviometro").select("id, nome").eq("talhao_id", talhaoId);
            if (error) {
                showCustomToast("Erro ao consultar o banco de dados de pluviômetros", "error");
            } else {
                setPluviometers(pluviometers || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de pluviômetros", "error");
        }
    };

    useEffect(() => {
        loadFazendas();
    }, []);

    useEffect(() => {
        if (selectedFazenda) {
            loadTalhoes(selectedFazenda);
            setSelectedTalhao("");
            setSelectedPluviometer("");
        }
    }, [selectedFazenda]);

    useEffect(() => {
        if (selectedTalhao) {
            loadPluviometers(selectedTalhao);
            setSelectedPluviometer("");
        }
    }, [selectedTalhao]);

    useEffect(() => {
        setIsButtonDisabled(!(selectedPluviometer && precipitationValue && precipitationDate));
    }, [selectedPluviometer, precipitationValue, precipitationDate]);

    const onSubmit = async (data: any) => {
        try {
            const selectedDate = new Date(precipitationDate); // Converte a string da data para um objeto Date
            const formattedDate = selectedDate.toISOString().split('T')[0]; // Formata a data para o formato "YYYY-MM-DD"

            const { data: insertedPrecipitation, error } = await supabase
                .from("precipitacao")
                .insert([{ valor: precipitationValue, data: formattedDate, pluviometro_id: selectedPluviometer }]);

            if (error) {
                setToastType("error");
                showCustomToast("Erro ao inserir a precipitação: " + error.message, "error");
            } else {
                setToastType("success");
                showCustomToast("Precipitação inserida com sucesso.", "success");
                reset();
                setSelectedFazenda("");
                setSelectedTalhao("");
                setSelectedPluviometer("");
                setPrecipitationValue("");
                setPrecipitationDate("");
            }
        } catch (error) {
            setToastType("error");
            showCustomToast("Erro ao registrar a precipitação.", "error");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Selecione a Fazenda:</Text>
            <Picker
                selectedValue={selectedFazenda}
                onValueChange={(itemValue, itemIndex) => setSelectedFazenda(itemValue)}
            >
                <Picker.Item label="Selecione uma fazenda..." value="" />
                {fazendas.map((fazenda) => (
                    <Picker.Item key={fazenda.id} label={fazenda.nome} value={fazenda.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Selecione o Talhão:</Text>
            <Picker
                selectedValue={selectedTalhao}
                onValueChange={(itemValue, itemIndex) => setSelectedTalhao(itemValue)}
            >
                <Picker.Item label="Selecione um talhão..." value="" />
                {talhoes.map((talhao) => (
                    <Picker.Item key={talhao.id} label={talhao.nome} value={talhao.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Selecione o Pluviômetro:</Text>
            <Picker
                selectedValue={selectedPluviometer}
                onValueChange={(itemValue, itemIndex) => setSelectedPluviometer(itemValue)}
            >
                <Picker.Item label="Selecione um pluviômetro..." value="" />
                {pluviometers.map((pluviometer) => (
                    <Picker.Item key={pluviometer.id} label={pluviometer.nome} value={pluviometer.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Valor da Precipitação:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor da precipitação"
                value={precipitationValue}
                onChangeText={(value) => setPrecipitationValue(value)}
            />
            {errors.precipitationValue && <Text style={styles.errorText}>O valor da precipitação é obrigatório.</Text>}

            <Text style={styles.label}>Data da Precipitação:</Text>
            <Calendar
                onDayPress={(day) => setPrecipitationDate(day.dateString)}
                markedDates={{
                    [precipitationDate]: { selected: true, selectedColor: 'blue' }, // Marca a data selecionada
                }}
            />
            {errors.precipitationDate && <Text style={styles.errorText}>A data da precipitação é obrigatória.</Text>}

            <Button title="Registrar Precipitação" onPress={handleSubmit(onSubmit)} disabled={isButtonDisabled} />

            <View style={{ top: -180, width: "100%" }}>
                {toastVisible && <CustomToast message={toastMessage} onHide={() => setToastVisible(false)} type={toastType} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    errorText: {
        color: "red",
        marginBottom: 8,
    },
});
