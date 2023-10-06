import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';

type RotatingArrowButtonProps = {
    onStartRotation: () => void;
    onStopRotation: () => void;
    isRotating: boolean;
};

const RotatingArrowButton = ({
    onStartRotation,
    onStopRotation,
    isRotating,
}: RotatingArrowButtonProps) => {
    const rotation = useRef(new Animated.Value(0)).current;

    const startRotation = () => {
        onStartRotation();
        rotation.setValue(0); // Redefine a animação para o estado inicial
        Animated.timing(rotation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(onStopRotation); // Chama onStopRotation quando a animação estiver concluída
    };

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };

    return (
        <TouchableOpacity onPress={isRotating ? () => { } : startRotation}>
            <Animated.View style={[styles.arrow, animatedStyle]}>
                <FontAwesome name="refresh" size={20} color="black" />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    arrow: {
        width: 30,
        height: 30,
        paddingTop: 10,
        alignSelf: 'center',
    },
});

export default RotatingArrowButton;
