import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import CustomToast from "../CustomToast";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../../lib/supabase";

export default function PluviometerRegister() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<undefined | 'info' | 'error' | 'success'>(undefined);
    const [fazendas, setFazendas] = useState<{ id: any; nome: any; }[]>([]); // Armazena a lista de fazendas disponíveis
    const [selectedFazenda, setSelectedFazenda] = useState('');
    const [talhoes, setTalhoes] = useState<{ id: any; nome: any; }[]>([]); // Armazena a lista de talhões da fazenda selecionada
    const [selectedTalhao, setSelectedTalhao] = useState('');

    const showCustomToast = (message: string, type?: 'info' | 'error' | 'success') => {
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
    } = useForm({ mode: 'onBlur' });

    const loadFazendas = async () => {
        try {
            const { data: fazendas, error } = await supabase.from('fazenda').select('id, nome');
            if (error) {
                showCustomToast('Erro ao consultar o banco de dados de fazendas', 'error');
            } else {
                setFazendas(fazendas || []);
            }
        } catch (error) {
            showCustomToast('Erro ao carregar a lista de fazendas', 'error');
        }
    };

    const loadTalhoes = async (fazendaId: any) => {
        try {
            const { data: talhoes, error } = await supabase
                .from('talhao')
                .select('id, nome')
                .eq('fazenda_id', fazendaId);
            if (error) {
                showCustomToast('Erro ao consultar o banco de dados de talhões', 'error');
            } else {
                setTalhoes(talhoes || []);
            }
        } catch (error) {
            showCustomToast('Erro ao carregar a lista de talhões', 'error');
        }
    };

    useEffect(() => {
        loadFazendas();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const pluviometerName = data.pluviometerName.trim();
            if (!selectedFazenda) {
                showCustomToast('Selecione uma fazenda para vincular o pluviômetro', 'info');
                return;
            }
            if (!selectedTalhao) {
                showCustomToast('Selecione um talhão para vincular o pluviômetro', 'info');
                return;
            }

            const { data: insertedPluviometer, error } = await supabase
                .from('pluviometro')
                .insert([{ nome: pluviometerName, talhao_id: selectedTalhao }]);

            if (error) {
                setToastType('error');
                showCustomToast('Erro ao inserir o pluviômetro: ' + error.message, 'error');
            } else {
                setToastType('success');
                showCustomToast('Pluviômetro inserido com sucesso: Um novo pluviômetro foi registrado no banco de dados.', 'success');
                reset();
                setSelectedFazenda('');
                setSelectedTalhao('');
            }
        } catch (error) {
            setToastType('error');
            showCustomToast('Erro ao registrar o pluviômetro: ', 'error');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Nome do Pluviômetro:</Text>
            <Controller
                name="pluviometerName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                        onChangeText={(value) => onChange(value)}
                        style={styles.input}
                        placeholder="Digite o nome do pluviômetro"
                        value={value}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.pluviometerName && <Text style={styles.errorText}>O nome do pluviômetro é obrigatório.</Text>}

            <Text style={styles.label}>Selecione a Fazenda:</Text>
            <Picker
                selectedValue={selectedFazenda}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedFazenda(itemValue);
                    loadTalhoes(itemValue);
                }}
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

            <Button title="Criar Pluviômetro" onPress={handleSubmit(onSubmit)} />

            <View style={{ top: -180, width: '100%' }}>
                {toastVisible && (
                    <CustomToast
                        message={toastMessage}
                        onHide={() => setToastVisible(false)}
                        type={toastType}
                    />
                )}
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
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});
