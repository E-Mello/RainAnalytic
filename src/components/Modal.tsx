import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fazendasAtom, pluviometersAtom, selectedFazendaAtom, selectedPluviometerAtom, selectedTalhaoAtom, talhoesAtom } from '../atoms/rainDataAtoms';

import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { isActiveModelAtom } from '../atoms/activeModelAtom';
import styles from '../styles/styleModal';
import { supabase } from '../lib/supabase';
import { useAtom } from 'jotai';

export default function ModalScreen() {
    const [isActiveModel, setIsActiveModel] = useAtom(isActiveModelAtom);

    //Consult all data from db
    const [fazendas, setFazendas] = useAtom(fazendasAtom); // Lista de fazendas
    const [talhoes, setTalhoes] = useAtom(talhoesAtom); // Lista de talhões
    const [pluviometros, setPluviometros] = useAtom(pluviometersAtom); // Lista de pluviômetros

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

    //  Carregar as fazendas
    useEffect(() => {
        loadFazendas();
    }, []);

    //Funcao para carregar as fazendas
    const loadFazendas = async () => {
        try {
            const { data: fazendas, error } = await supabase
                .from("fazenda")
                .select("id, nome");
            if (error) {
                showToast("Erro ao consultar as fazendas:", "error");
            } else {
                setFazendas(fazendas || []);
            }
        } catch (error) {
            showToast("Erro ao carregar a lista de fazendas:", "error");
        }
    };

    //  Carregar os talhões
    useEffect(() => {
        if (selectedFazenda?.id) {
            loadTalhoes(selectedFazenda?.id);
        }
    }, [selectedFazenda?.id]);

    const loadTalhoes = async (fazendaId: any) => {
        try {
            const { data: talhoes, error } = await supabase
                .from("talhao")
                .select("id, nome")
                .eq("fazenda_id", fazendaId);
            if (error) {
                showToast("Erro ao consultar os talhões:", "error");
            } else {
                setTalhoes(talhoes || []);
            }
        } catch (error) {
            showToast("Erro ao carregar a lista de talhões:", "error");
        }
    };

    //  Carregar os pluviômetros
    useEffect(() => {
        if (selectedTalhao?.id) {
            loadPluviometers(selectedTalhao?.id);
        }
    }, [selectedTalhao?.id]);

    const loadPluviometers = async (talhaoId: any) => {
        try {
            const { data: pluviometers, error } = await supabase
                .from("pluviometro")
                .select("id, nome")
                .eq("talhao_id", talhaoId);
            if (error) {
                showToast("Erro ao consultar os pluviômetros:", "error");
            } else {
                setPluviometros(pluviometers || []);
            }
        } catch (error) {
            showToast("Erro ao carregar a lista de pluviômetros:", "error");
        }
    };



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
                                selectedValue={selectedFazenda?.id}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selectedFazendaObject = fazendas.find(fazenda => fazenda.id === itemValue);
                                    setSelectedFazenda(selectedFazendaObject);
                                }}
                            >
                                {fazendas.map((fazenda) => (
                                    <Picker.Item
                                        key={fazenda.id}
                                        label={fazenda.nome}
                                        value={fazenda.id}
                                    />
                                ))}
                            </Picker>


                        </View>

                        <View>
                            <Text style={styles.subtitle}>Selecione o talhão:</Text>
                            <Picker
                                selectedValue={selectedTalhao?.id}
                                onValueChange={(value, itemIndex) => {
                                    const selectedTalhaoObject = talhoes.find(talhao => talhao.id === value);
                                    setSelectedTalhao(selectedTalhaoObject);
                                }}
                            >
                                {talhoes.map((talhao) => (
                                    <Picker.Item
                                        key={talhao.id}
                                        label={talhao.nome}
                                        value={talhao.id}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <View>
                            <Text style={styles.subtitle}>Selecione o pluviômetro:</Text>
                            <Picker
                                selectedValue={selectedPluviometro}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selectedPluviometroObject = pluviometros.find(pluviometro => pluviometro.id === itemValue);
                                    setSelectedPluviometro(selectedPluviometroObject);
                                }}
                            >
                                {pluviometros.map((pluviometer) => (
                                    <Picker.Item
                                        key={pluviometer.id}
                                        label={pluviometer.nome}
                                        value={pluviometer.id}
                                    />
                                ))}
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


