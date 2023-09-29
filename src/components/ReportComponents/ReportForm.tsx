import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    buttonDisabledAtom,
    datePickerVisibleAtom,
    endDateAtom,
    fazendasAtom,
    isGeneratingReportAtom,
    pluviometersAtom,
    selectedDateAtom,
    selectedDayAtom,
    selectedEndDateAtom,
    selectedFazendaAtom,
    selectedPluviometerAtom,
    selectedStartDateAtom,
    selectedTalhaoAtom,
    startDateAtom,
    talhoesAtom
} from '../../atoms/reportAtoms';

import CustomDatePicker from './CustomDatePicker';
import CustomToast from '../CustomToast';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import styles from '../../styles/stylesReportForm';
import { supabase } from '../../lib/supabase';
import { useAtom } from 'jotai';

// Importe os átomos corretamente

function ReportForm() {
    const [selectedFazenda, setSelectedFazenda] = useAtom(selectedFazendaAtom);
    const [selectedTalhao, setSelectedTalhao] = useAtom(selectedTalhaoAtom);
    const [selectedPluviometers, setSelectedPluviometers] = useAtom(selectedPluviometerAtom);
    const [isGeneratingReport] = useAtom(isGeneratingReportAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useAtom(buttonDisabledAtom);

    //Const para as tabelas
    const [pluviometers, setPluviometers] = useAtom(pluviometersAtom);
    const [fazendas, setFazendas] = useAtom(fazendasAtom);
    const [talhoes, setTalhoes] = useAtom(talhoesAtom);

    //Consts para o CustomDatePicker
    const [selectedStartDate, setSelectedStartDate] = useAtom(selectedStartDateAtom);
    const [selectedEndDate, setSelectedEndDate] = useAtom(selectedEndDateAtom);
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
    const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);
    const [datePickerVisible, setDatePickerVisible] = useAtom(datePickerVisibleAtom);
    const [isStartDateAtom, setIsStartDateAtom] = useAtom(startDateAtom);
    const [isEndDateAtom, setIsEndDateAtom] = useAtom(endDateAtom);

    //Const para o modal do relatorio
    const [isModalVisible, setIsModalVisible] = useAtom(isGeneratingReportAtom);

    //Funções

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

    // Função para mostrar o CustomDatePicker
    const showDatePicker = () => {
        setDatePickerVisible(true);
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
                showToast("Erro ao consultar os talhões:", "error");
            } else {
                setTalhoes(talhoes || []);
            }
        } catch (error) {
            showToast("Erro ao carregar a lista de talhões:", "error");
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
                showToast("Erro ao consultar os pluviômetros:", "error");
            } else {
                setPluviometers(pluviometers || []);
            }
        } catch (error) {
            showToast("Erro ao carregar a lista de pluviômetros:", "error");
        }
    };

    useEffect(() => {
        setIsButtonDisabled(!(selectedPluviometers && selectedDay));
    }, [selectedPluviometers, selectedDay]);

    // Função para carregar informações adicionais com base nas seleções do usuário
    const loadAdditionalData = async () => {
        if (!selectedTalhao) {
            return;
        }

        setIsLoading(true);

        // Simule um atraso para mostrar o indicador de carregamento
        setTimeout(async () => {
            try {
                // Aqui pode ser implementado a lógica para carregar a lista de pluviômetros
                // com base no talhão selecionado (selectedTalhao).
                // Da pra definir as informações carregadas em seus estados correspondentes, como pluviometers.

                // Exemplo:Selected
                // const pluviometerData = await loadPluviometers(selectedTalhao);
                // setPluviometers(pluviometerData);

                setIsLoading(false);
            } catch (error) {
                showToast('Erro ao carregar informações adicionais.', 'error');
                setIsLoading(false);
            }
        }, 1000); // Simulação de atraso de 1 segundo
    }


    useEffect(() => {
        // Carrega informações adicionais quando o talhão for selecionado.
        loadAdditionalData();
    }, [selectedTalhao]);

    const handlePluviometerSelection = (pluviometerId: number) => {
        // Verifica se o pluviômetro já está selecionado
        if (selectedPluviometers.includes(pluviometerId)) {
            // Se já estiver selecionado, remova-o da lista de seleção
            setSelectedPluviometers((prevSelectedPluviometers) =>
                prevSelectedPluviometers.filter((id) => id !== pluviometerId)
            );
        } else {
            // Caso contrário, adicione-o à lista de seleção
            setSelectedPluviometers((prevSelectedPluviometers) =>
                [...prevSelectedPluviometers, pluviometerId]
            );
        }
    };

    return (
        <View>
            <View style={styles.section}>
                <Text style={styles.label}>Selecione a Fazenda:</Text>
                <Picker
                    selectedValue={selectedFazenda}
                    onValueChange={(itemValue) => setSelectedFazenda(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione uma fazenda..." value="" />
                    {fazendas.map((fazenda) => (
                        <Picker.Item
                            key={fazenda.id}
                            label={fazenda.nome}
                            value={fazenda.id}
                        />
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
                            <Picker.Item
                                key={talhao.id}
                                label={talhao.nome}
                                value={talhao.id}
                            />
                        ))}
                    </Picker>
                </View>
            )}

            {selectedTalhao && (
                <View style={styles.section}>
                    <Text style={styles.label}>Selecione o Pluviômetro:</Text>
                    <Picker
                        selectedValue={selectedPluviometers}
                        onValueChange={(itemValue) =>
                            setSelectedPluviometers(itemValue)
                        }
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione um pluviômetro..." value="" />
                        {pluviometers.map((pluviometer) => (
                            <Picker.Item
                                key={pluviometer.id}
                                label={pluviometer.nome}
                                value={pluviometer.id}
                            />
                        ))}
                    </Picker>
                </View>
            )}

            {selectedPluviometers && (
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.dateText}>
                            Clique para selecionar periodo do relatorio
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {datePickerVisible && (
                <CustomDatePicker
                    visible={datePickerVisible}
                    selectedDate={selectedDate}
                    onClose={() => setDatePickerVisible(false)}
                    onDateChange={(newDate: React.SetStateAction<Date | null>) => {
                        setSelectedDate(newDate);
                        setDatePickerVisible(false);
                    }}
                />
            )}

            <View style={styles.dateDisplayContainer}>
                <Text style={styles.dateLabel}>Data de Início:</Text>
                <Text style={styles.dateText}>
                    {isStartDateAtom
                        ? format(isStartDateAtom, 'dd-MM-yyyy', { locale: ptBR }) // Formata a data para "DD-MM-YYYY" em português (pt-BR)
                        : 'Não selecionada'}
                </Text>
            </View>
            <View style={styles.dateDisplayContainer}>
                <Text style={styles.dateLabel}>Data de Término:</Text>
                <Text style={styles.dateText}>
                    {isEndDateAtom
                        ? format(isEndDateAtom, 'dd-MM-yyyy', { locale: ptBR }) // Formata a data para "DD-MM-YYYY" em português (pt-BR)
                        : 'Não selecionada'}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => {
                    setIsModalVisible(!isModalVisible)
                }}
                disabled={selectedPluviometers?.length === 0 || isLoading}
                style={styles.generateButton}
            >
                <Text style={styles.generateButtonText}>Gerar Relatório</Text>
            </TouchableOpacity>

        </View>
    );
}

export default ReportForm;
