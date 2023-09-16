import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, Form, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import CustomToast from '../CustomToast';
import { Picker } from '@react-native-picker/picker';
import { ZodError } from 'zod';
import styles from '../../styles/styleRegisterFarm';
import { supabase } from '../../lib/supabase';

export default function FieldRegister() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<undefined | 'info' | 'error' | 'success'>(undefined);
    const [fazendas, setFazendas] = useState<{ id: any; nome: any; }[]>([]); // Armazena a lista de fazendas disponíveis
    const [selectedFazenda, setSelectedFazenda] = useState(''); // Armazena a fazenda selecionada

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
        reset, // Adicionado o reset do useForm
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

    useEffect(() => {
        loadFazendas();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const fieldName = data.fieldName.trim().toLowerCase();

            if (!selectedFazenda) {
                showCustomToast('Selecione uma fazenda para vincular o talhão', 'error');
                return;
            }

            const { data: insertedField, error } = await supabase.from('talhao').insert([{ nome: fieldName, fazenda_id: selectedFazenda }]);
            setToastType('success');
            showCustomToast('Talhão inserido com sucesso: Um novo talhão foi registrado no banco de dados.', 'success');
            if (error) {
                setToastType('error');
                showCustomToast('Erro ao inserir o talhão: ' + error.message, 'error');
            } else {
                console.log('Talhão inserido com sucesso:', insertedField);
                reset(); // Redefine o formulário após a submissão bem-sucedida
                setSelectedFazenda(''); // Limpa a seleção da fazenda
            }
        } catch (error) {
            setToastType('error');
            showCustomToast('Erro ao registrar o talhão: ', 'error');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Nome do Talhão:</Text>
            <Controller
                name="fieldName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                        onChangeText={(value) => onChange(value)}
                        style={styles.input}
                        placeholder="Digite o nome do talhão"
                        value={value}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.fieldName && <Text style={styles.errorText}>O nome do talhão é obrigatório.</Text>}

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

            <Button title="Criar Talhão" onPress={handleSubmit(onSubmit)} />

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
