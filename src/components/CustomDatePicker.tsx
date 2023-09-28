import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { endDateAtom, startDateAtom } from '../atoms/dateForReports';

import { Calendar } from 'react-native-calendars';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './../styles/styleCustomDatePicker'; // Importe os estilos externos
import { useAtom } from 'jotai';

interface CustomDatePickerProps {
    visible: boolean;
    selectedDate: Date | null;
    onClose: () => void;
    onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

export default function CustomDatePicker({
    visible,
    selectedDate,
    onClose,
    onDateChange,
}: CustomDatePickerProps) {
    const currentDate = new Date(); // Obtenha a data atual

    // Função auxiliar para formatar a data como DD/MM/YYYY
    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [isStartDate, setIsStartDate] = useAtom(startDateAtom);
    const [isEndDate, setIsEndDate] = useAtom(endDateAtom);

    // Inicialize o estado interno do Calendar com a data atual no formato YYYY-MM-DD
    const [calendarDate, setCalendarDate] = useState(
        selectedDate ? formatDate(selectedDate) : currentDate.toISOString().slice(0, 10)
    );


    // Inicialize startDate e endDate com a data atual inicialmente
    const [startDateText, setStartDateText] = useState(
        selectedDate ? formatDate(selectedDate) : ''
    );
    const [endDateText, setEndDateText] = useState(
        selectedDate ? formatDate(selectedDate) : ''
    );

    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);

    useEffect(() => {
        // Se o `selectedDate` mudar externamente, atualize os campos de texto
        if (selectedDate) {
            setStartDateText(formatDate(selectedDate));
            setEndDateText(formatDate(selectedDate));
        }
    }, [selectedDate]);

    const handleConfirm = () => {
        const startDateArray = startDateText.split('/');
        const endDateArray = endDateText.split('/');

        const startDate = new Date(
            parseInt(startDateArray[2]),
            parseInt(startDateArray[1]) - 1,
            parseInt(startDateArray[0])
        );

        const endDate = new Date(
            parseInt(endDateArray[2]),
            parseInt(endDateArray[1]) - 1,
            parseInt(endDateArray[0])
        );

        // Atualize os estados globais com as datas selecionadas
        setIsStartDate(startDate);
        setIsEndDate(endDate);

        setShowStartCalendar(false);
        setShowEndCalendar(false);
        onDateChange(startDate, endDate);
        onClose();
    };


    // Função para formatar a data como DD-MM-YYYY
    const formatToDDMMYYYY = (date: string) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    // Função para formatar o texto de entrada com barras e limitar a 10 caracteres
    const formatInputText = (text: string) => {
        // Remova caracteres não numéricos
        const numericText = text.replace(/[^0-9]/g, '');

        // Adicione as barras automaticamente
        if (numericText.length <= 2) {
            // Formate DD
            return numericText;
        } else if (numericText.length <= 4) {
            // Formate DD/MM
            return `${numericText.substr(0, 2)}/${numericText.substr(2)}`;
        } else {
            // Formate DD/MM/YYYY
            return `${numericText.substr(0, 2)}/${numericText.substr(2, 2)}/${numericText.substr(4, 4)}`.substring(0, 10);
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                {/* Header Modal */}
                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.closeIconContainer} onPress={onClose}>
                        <Text>
                            <FontAwesome5 name="times" style={styles.closeIcon} />
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        Digite a data ou selecione no calendário
                    </Text>
                </View>
                {/* Start Date Input */}
                <View style={styles.inputContainer}>
                    <View style={styles.viewTextInputContainer}>
                        <Text>Data Inicio: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DD-MM-YYYY"
                            value={startDateText}
                            onChangeText={(text) => {
                                const formattedText = formatInputText(text);
                                setStartDateText(formattedText);
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity onPress={() => setShowStartCalendar(true)}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </TouchableOpacity>
                </View>
                {showStartCalendar && (
                    <View style={styles.calendarView}>
                        <Calendar
                            style={styles.calendar}
                            current={calendarDate}
                            onDayPress={(day) => {
                                setCalendarDate(day.dateString); // Mantenha o formato YYYY-MM-DD
                                setShowStartCalendar(false);
                                // Atualize o estado interno dos campos de entrada com o formato DD-MM-YYYY
                                setStartDateText(formatToDDMMYYYY(day.dateString));
                            }}
                        />

                    </View>
                )}

                {/* End Date Input */}
                <View style={styles.inputContainer}>
                    <View style={styles.viewTextInputContainer}>
                        <Text>Data Fim: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DD-MM-YYYY"
                            value={endDateText}
                            onChangeText={(text) => {
                                const formattedText = formatInputText(text);
                                setEndDateText(formattedText);
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity onPress={() => setShowEndCalendar(true)}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </TouchableOpacity>
                </View>
                {showEndCalendar && (
                    <View style={styles.calendarView}>
                        <Calendar
                            style={styles.calendar}
                            current={calendarDate}
                            onDayPress={(day) => {
                                setCalendarDate(day.dateString); // Mantenha o formato YYYY-MM-DD
                                setShowEndCalendar(false);
                                // Atualize o estado interno dos campos de entrada com o formato DD-MM-YYYY
                                setEndDateText(formatToDDMMYYYY(day.dateString));
                            }}
                        />
                    </View>
                )}

                {/* Conteúdo abaixo da entrada de data de término */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Confirmar"
                        onPress={handleConfirm}
                        color={styles.button.backgroundColor} // Use a cor definida em seu estilo
                    />
                </View>
            </View>
        </Modal>
    );
}
