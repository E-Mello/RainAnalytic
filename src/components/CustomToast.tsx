import { Animated, Easing, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from '../styles/styleCustomToast';

interface CustomToastProps {
    message: string;
    onHide: () => void;
    type?: 'info' | 'error' | 'success'; // Adicionando um tipo
}

const getBackgroundColor = (type?: 'info' | 'error' | 'success') => {
    switch (type) {
        case 'info':
            return 'blue';
        case 'error':
            return 'red';
        case 'success':
            return 'green';
        default:
            return 'white'; // Valor padrão para tipo indefinido
    }
};

const getLabelColor = (type?: 'info' | 'error' | 'success') => {
    return type === 'success' ? 'black' : 'white';
};

export default function CustomToast({ message, onHide, type }: CustomToastProps) {
    const [fadeAnim] = useState(new Animated.Value(0));
    const backgroundColor = getBackgroundColor(type); // Função para obter a cor de fundo com base no tipo
    const labelColor = getLabelColor(type); // Função para obter a cor da etiqueta com base no tipo

    useEffect(() => {
        showToast();
    }, []);

    const showToast = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                hideToast();
            }, 3000); // Esconde o Toast após 3 segundos
        });
    };

    const hideToast = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            onHide();
        });
    };

    let title = '';
    switch (type) {
        case 'info':
            title = 'INFO';
            break;
        case 'error':
            title = 'ERROR';
            break;
        case 'success':
            title = 'SUCCESS';
            break;
        default:
            title = '';
            break;
    }

    return (
        <View style={[styles.container]}>
            {type && (
                <View style={[styles.labelContainer, { backgroundColor }]}>
                </View>
            )}
            <View style={styles.content}>
                <Text style={[styles.title]}>{title}</Text>
                <Text style={[styles.message]}>{message}</Text>
            </View>
        </View>
    );
}

