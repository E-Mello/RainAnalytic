import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, Form, useForm } from 'react-hook-form';
import React, { useState } from 'react';

import CustomToast from '../CustomToast';
import { ZodError } from 'zod';
import styles from '../../styles/styleRegisterFarm';
import { supabase } from '../../lib/supabase';

export default function FarmRegister() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState(''); // Armazena a mensagem do Toast
    const [toastType, setToastType] = useState<undefined | 'info' | 'error' | 'success'>(undefined); // Armazena o tipo do Toast

    const showCustomToast = (message: string, type?: 'info' | 'error' | 'success') => {
        setToastMessage(message);
        setToastVisible(true);

        setTimeout(() => {
            setToastVisible(false);
        }, 3000); // Esconde o Toast após 3 segundos

        setToastType(type); // Define o tipo do Toast com base no argumento recebido
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' });

    const onSubmit = async (data: any) => {
        try {
            const nome = data.nome.trim().toLowerCase();

            const { data: existingFarms, error } = await supabase
                .from('fazenda')
                .select('nome')
                .eq('nome', nome);

            if (error) {
                showCustomToast('Erro ao consultar o banco de dados', 'error');
            } else if (existingFarms && existingFarms.length > 0) {
                showCustomToast('Fazenda já existe: Uma fazenda com este nome já está registrada no banco de dados.', 'info');
            } else {
                const { data: insertedFarm, error } = await supabase.from('fazenda').insert([{ nome }]);
                setToastType('success');
                showCustomToast('Fazenda inserida com sucesso: Uma nova fazenda foi registrada no banco de dados.', 'success');
                if (error) {
                    setToastType('error');
                    showCustomToast('Erro ao inserir a fazenda: ' + error.message, 'error');
                } else {
                    console.log('Fazenda inserida com sucesso:', insertedFarm);
                }
            }
        } catch (error) {
            setToastType('error');
            showCustomToast('Erro ao registrar a fazenda: ', 'error');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Nome da Fazenda:</Text>
            <Controller
                name="nome"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                        onChangeText={(value) => onChange(value)}
                        style={styles.input}
                        placeholder="Digite o nome da fazenda"
                        value={value}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.nome && <Text style={styles.errorText}>O nome da fazenda é obrigatório.</Text>}

            <Button title="Criar Fazenda" onPress={handleSubmit(onSubmit)} />

            {/* Renderize o ToastMessage na parte superior do componente */}
            <View style={{ top: -180, width: '100%' }}>
                {toastVisible && (
                    <CustomToast
                        message={toastMessage}
                        onHide={() => setToastVisible(false)}
                        type={toastType} // Fornece um valor padrão
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
