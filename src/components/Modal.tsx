import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { isActiveModelAtom } from '../atoms/activeModelAtom';
import styles from '../styles/styleModal';
import { useAtom } from 'jotai';

export default function ModalScreen() {
    const [isActiveModel, setIsActiveModel] = useAtom(isActiveModelAtom);
    const [selectedFazenda, setSelectedFazenda] = useState('Fazenda A'); // Defina a fazenda pré-selecionada
    const [selectedTalhao, setSelectedTalhao] = useState('Talhão 1'); // Defina o talhão pré-selecionado
    const [selectedPluviometro, setSelectedPluviometro] = useState('Pluviômetro 1'); // Defina o pluviômetro pré-selecionado

    const closeModal = () => {
        setIsActiveModel(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isActiveModel}
            onRequestClose={closeModal}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    {/* Cabeçalho do Modal */}
                    <View style={styles.header}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Escolha a fazenda e as suas especificações</Text>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {/* Conteúdo do Modal */}
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.subtitle}>Selecione a fazenda:</Text>
                            <Picker
                                selectedValue={selectedFazenda}
                                onValueChange={(itemValue, itemIndex) => setSelectedFazenda(itemValue)}
                            >
                                <Picker.Item label="Fazenda A" value="Fazenda A" />
                                <Picker.Item label="Fazenda B" value="Fazenda B" />
                                {/* Adicione mais fazendas conforme necessário */}
                            </Picker>
                        </View>

                        <View>
                            <Text style={styles.subtitle}>Selecione o talhão:</Text>
                            <Picker
                                selectedValue={selectedTalhao}
                                onValueChange={(itemValue, itemIndex) => setSelectedTalhao(itemValue)}
                            >
                                <Picker.Item label="Talhão 1" value="Talhão 1" />
                                <Picker.Item label="Talhão 2" value="Talhão 2" />
                                {/* Adicione mais talhões conforme necessário */}
                            </Picker>
                        </View>

                        <View>
                            <Text style={styles.subtitle}>Selecione o pluviômetro:</Text>
                            <Picker
                                selectedValue={selectedPluviometro}
                                onValueChange={(itemValue, itemIndex) => setSelectedPluviometro(itemValue)}
                            >
                                <Picker.Item label="Pluviômetro 1" value="Pluviômetro 1" />
                                <Picker.Item label="Pluviômetro 2" value="Pluviômetro 2" />
                                {/* Adicione mais pluviômetros conforme necessário */}
                            </Picker>

                            <TouchableOpacity onPress={closeModal} style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Escolher e fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}


