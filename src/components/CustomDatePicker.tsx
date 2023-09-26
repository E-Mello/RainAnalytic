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
import CustomToast from './CustomToast';
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
    const currentDate = new Date(); // Get the current date

    // Initialize startDate and endDate with the current date initially
    const [startDate, setStartDate] = useState(selectedDate || currentDate);
    const [endDate, setEndDate] = useState(selectedDate || currentDate);

    const [showStartCalendar, setShowStartCalendar] = useState(false); // Separate state for the start date calendar
    const [showEndCalendar, setShowEndCalendar] = useState(false); // Separate state for the end date calendar

    // Helper function to format the date as DD/MM/YYYY
    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateInputChange = (
        text: string,
        setDateFunction: { (value: React.SetStateAction<Date>): void }
    ) => {
        const dateParts = text.split('/');

        if (dateParts.length === 3) {
            const day = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1;
            const year = parseInt(dateParts[2]);

            // Check if the entered date is valid and not in the future
            if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year >= 1000) {
                const newDate = new Date(year, month, day);
                setDateFunction(newDate);
            }
        } else {
            // If the input does not contain 3 parts (DD/MM/YYYY), do not update the date
        }
    };

    const handleConfirm = () => {
        setShowStartCalendar(false);
        setShowEndCalendar(false);
        onDateChange(startDate, endDate);
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                {/* Content above the start date input */}
                <View>
                    <Button title="Fechar" onPress={onClose} />
                    <Text>Selecione a Data de Início:</Text>
                </View>

                {/* Start Date Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        value={startDate ? formatDate(startDate) : ''}
                        onChangeText={(text) => {
                            handleDateInputChange(text, setStartDate);
                        }}
                    />

                    <TouchableOpacity onPress={() => setShowStartCalendar(true)}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </TouchableOpacity>
                </View>
                {showStartCalendar && (
                    <Calendar
                        style={styles.calendar} // Apply styles here
                        current={startDate.toISOString().split('T')[0]}
                        onDayPress={(day) => {
                            const dateParts = day.dateString.split('-');
                            const year = parseInt(dateParts[0]);
                            const month = parseInt(dateParts[1]) - 1;
                            const dayOfMonth = parseInt(dateParts[2]);
                            const newDate = new Date(year, month, dayOfMonth);
                            setStartDate(newDate);
                            setShowStartCalendar(false);
                        }}
                    />
                )}

                {/* Content between start and end date inputs */}
                <View>
                    {/* Add any content you want between the date inputs here */}
                </View>

                {/* End Date Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        value={endDate ? formatDate(endDate) : ''}
                        onChangeText={(text) => {
                            handleDateInputChange(text, setEndDate);
                        }}
                    />
                    <TouchableOpacity onPress={() => setShowEndCalendar(true)}>
                        <Text style={styles.calendarIcon}>📅</Text>
                    </TouchableOpacity>
                </View>
                {showEndCalendar && (
                    <Calendar
                        style={styles.calendar} // Apply styles here
                        current={endDate.toISOString().split('T')[0]}
                        onDayPress={(day) => {
                            const dateParts = day.dateString.split('-');
                            const year = parseInt(dateParts[0]);
                            const month = parseInt(dateParts[1]) - 1;
                            const dayOfMonth = parseInt(dateParts[2]);
                            const newDate = new Date(year, month, dayOfMonth);
                            setEndDate(newDate);
                            setShowEndCalendar(false);
                        }}
                    />
                )}

                {/* Content below the end date input */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Confirmar"
                        onPress={handleConfirm}
                        color={styles.button.backgroundColor} // Use the color defined in your style
                    />
                </View>
            </View>
        </Modal>
    );
}