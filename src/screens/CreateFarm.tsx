import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { FarmCreateSchema } from '../types/FazendaTypes'
import React from 'react';
import styles from '../types/CreateFarmTypes';
import { supabase } from '../lib/supabase';
import { zodResolver } from "@hookform/resolvers/zod";

export default function FarmCreationScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: 'onBlur' })

    const onSubmit = (data: any) => console.log(data)


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Nome da Fazenda:</Text>
            <Controller
                name="farmName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                        onChangeText={value => onChange(value)}
                        style={styles.input}
                        placeholder="Digite o nome da fazenda"
                        value={value}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.farmName && <Text style={styles.errorText}>O nome da fazenda é obrigatório.</Text>}

            <Button title="Criar Fazenda" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
    );
}


