import {
    Button,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';

import { Calendar } from 'react-native-calendars';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './../styles/styleCustomDatePicker'; // Importe os estilos externos

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

    // Inicialize startDate e endDate com a data atual inicialmente
    const [startDateText, setStartDateText] = useState(
        selectedDate ? formatDate(selectedDate) : ''
    );
    const [endDateText, setEndDateText] = useState(
        selectedDate ? formatDate(selectedDate) : ''
    );

    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);

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

        setShowStartCalendar(false);
        setShowEndCalendar(false);
        onDateChange(startDate, endDate);
        onClose();
    };

    // Função para formatar o texto de entrada com barras
    const formatInputText = (text: string) => {
        // Remova caracteres não numéricos
        const numericText = text.replace(/[^0-9/]/g, '');

        if (numericText.length <= 2) {
            // Formate DD
            return numericText;
        } else if (numericText.length <= 4) {
            // Formate DD/MM
            return `${numericText.substr(0, 2)}/${numericText.substr(2)}`;
        } else {
            // Formate DD/MM/YYYY
            return `${numericText.substr(0, 2)}/${numericText.substr(2, 2)}/${numericText.substr(4, 4)}`;
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
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        value={startDateText}
                        onChangeText={(text) => {
                            const formattedText = formatInputText(text);
                            setStartDateText(formattedText);
                        }}
                        keyboardType="numeric" // Permita apenas o teclado numérico
                    />

                    <TouchableOpacity onPress={() => setShowStartCalendar(true)}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </TouchableOpacity>
                </View>
                {showStartCalendar && (
                    <View style={styles.calendarView}>
                        <Calendar
                            style={styles.calendar}
                            current={startDateText}
                            onDayPress={(day) => {
                                setStartDateText(day.dateString);
                                setShowStartCalendar(false);
                            }}
                        />
                    </View>
                )}

                {/* End Date Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        value={endDateText}
                        onChangeText={(text) => {
                            const formattedText = formatInputText(text);
                            setEndDateText(formattedText);
                        }}
                        keyboardType="numeric" // Permita apenas o teclado numérico
                    />
                    <TouchableOpacity onPress={() => setShowEndCalendar(true)}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </TouchableOpacity>
                </View>
                {showEndCalendar && (
                    <View style={styles.calendarView}>
                        <Calendar
                            style={styles.calendar}
                            current={endDateText}
                            onDayPress={(day) => {
                                setEndDateText(day.dateString);
                                setShowEndCalendar(false);
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
