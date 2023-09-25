import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';

import CustomToast from './CustomToast';
import { Picker } from '@react-native-picker/picker';
import datePickerStyles from '../styles/styleCustomDatePicker';
import styles from '../styles/styleCustomDatePicker';

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
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<undefined | 'info' | 'error' | 'success'>(
        undefined
    );

    const [startDate, setStartDate] = useState(selectedDate || new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    // Estados separados para as datas de início e fim
    const [tempStartDay, setTempStartDay] = useState<number | null>(startDate.getDate());
    const [tempStartMonth, setTempStartMonth] = useState<number | null>(startDate.getMonth() + 1);
    const [tempStartYear, setTempStartYear] = useState<number | null>(startDate.getFullYear());

    const [tempEndDay, setTempEndDay] = useState<number | null>(endDate?.getDate() || null);
    const [tempEndMonth, setTempEndMonth] = useState<number | null>(
        endDate?.getMonth() ? endDate?.getMonth() + 1 : null
    );
    const [tempEndYear, setTempEndYear] = useState<number | null>(
        endDate?.getFullYear() || null
    );


    const showCustomToast = (message: string, type?: 'info' | 'error' | 'success') => {
        setToastMessage(message);
        setToastVisible(true);

        setTimeout(() => {
            setToastVisible(false);
        }, 3000);

        setToastType(type);
    };

    // Função para validar se a data de fim é maior do que a data de início
    const isEndDateValid = (
        startDay: number,
        startMonth: number,
        startYear: number,
        endDay: number,
        endMonth: number,
        endYear: number
    ) => {
        const startDateObj = new Date(startYear, startMonth - 1, startDay);
        const endDateObj = new Date(endYear, endMonth - 1, endDay);

        return endDateObj >= startDateObj;
    };

    // Modificar a função handleConfirm para aplicar a seleção temporária às datas de início e fim
    const handleConfirm = () => {
        if (
            tempStartDay === null ||
            tempStartMonth === null ||
            tempStartYear === null ||
            tempEndDay === null ||
            tempEndMonth === null ||
            tempEndYear === null
        ) {
            showCustomToast('Preencha todos os campos de data', 'info');
        } else if (
            !isEndDateValid(
                tempStartDay,
                tempStartMonth,
                tempStartYear,
                tempEndDay,
                tempEndMonth,
                tempEndYear
            )
        ) {
            showCustomToast('A data de início deve ser menor ou igual à data de fim', 'info');
        } else {
            // Aplicar a seleção temporária às datas de início e fim
            setStartDate(new Date(tempStartYear, tempStartMonth - 1, tempStartDay));
            setEndDate(new Date(tempEndYear, tempEndMonth - 1, tempEndDay));

            setIsDatePickerVisible(false);
            onClose();
        }
    };


    const [selectedDay, setSelectedDay] = useState(startDate.getDate());
    const [selectedMonth, setSelectedMonth] = useState(startDate.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(startDate.getFullYear());
    const [activeDatePicker, setActiveDatePicker] = useState<'day' | 'month' | 'year'>('day');

    // Dentro do seu componente CustomDatePicker, adicione um novo estado temporário para a seleção do Picker.
    const [tempSelectedDay, setTempSelectedDay] = useState<number | null>(selectedDay);
    const [tempSelectedMonth, setTempSelectedMonth] = useState<number | null>(selectedMonth);
    const [tempSelectedYear, setTempSelectedYear] = useState<number | null>(selectedYear);

    // Função para obter os dias disponíveis com base no mês e ano atual
    const getAvailableDays = () => {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, index) => index + 1);
    };

    // Função para obter os anos disponíveis até o ano atual
    const getAvailableYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear + 1 }, (_, index) => currentYear - index);
    };

    const showDatePicker = (field: 'day' | 'month' | 'year') => {
        // Defina o estado para exibir o seletor de datas
        setIsDatePickerVisible(!isDatePickerVisible);

        try {
            // Use um estado adicional para rastrear qual campo está sendo editado
            switch (field) {
                case 'day':
                    setActiveDatePicker('day'); // Por padrão, comece com o seletor de dia
                    break;
                case 'month':
                    setActiveDatePicker('month'); // Você pode definir o seletor inicial para 'day' ou 'month' ou 'year' como preferir
                    break;
                case 'year':
                    setActiveDatePicker('year'); // Você pode definir o seletor inicial para 'day' ou 'month' ou 'year' como preferir
                    break;
                default:
                    setActiveDatePicker('day');
            }
        } catch (error) {
            console.error('Erro ao abrir o seletor de datas:', error);
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.datePickerContainer}>
                    <Text style={styles.modalTitle}>Selecione a Data</Text>

                    {/* Data Inicio */}
                    <Text style={styles.modalSubTitle}> Data Inicio</Text>
                    <View style={styles.dateSelectionContainer}>
                        {/* Dia */}
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.dateInputLabel}>Dia:</Text>
                            <View style={styles.dateInputAndIcon}>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="DD"
                                    keyboardType="number-pad"
                                    maxLength={2}
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            setTempStartDay(null);
                                        } else {
                                            const parsedValue = parseInt(text);
                                            setTempStartDay(isNaN(parsedValue) ? null : parsedValue);
                                        }
                                    }}
                                    value={tempStartDay !== null ? tempStartDay.toString() : ''}
                                />

                                <TouchableOpacity style={styles.dateInputIcon} onPress={() => showDatePicker('day')}>
                                    <Text style={styles.dateSelectionButton}>📅</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Mês */}
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.dateInputLabel}>Mês:</Text>
                            <View style={styles.dateInputAndIcon}>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="MM"
                                    keyboardType="number-pad"
                                    maxLength={2}
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            // Campo vazio, definir como null
                                            setTempStartMonth(null);
                                        } else {
                                            const parsedValue = parseInt(text);
                                            setTempStartMonth(isNaN(parsedValue) ? null : parsedValue);
                                        }
                                    }}
                                    value={tempSelectedMonth !== null ? tempSelectedMonth.toString() : ''}
                                />

                                <TouchableOpacity style={styles.dateInputIcon} onPress={() => showDatePicker('month')}>
                                    <Text style={styles.dateSelectionButton}>📅</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Ano */}
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.dateInputLabel}>Ano:</Text>
                            <View style={styles.dateInputAndIcon}>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="AAAA"
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            // Campo vazio, definir como null
                                            setTempStartYear(null);
                                        } else {
                                            const parsedValue = parseInt(text);
                                            setTempStartYear(isNaN(parsedValue) ? null : parsedValue);
                                        }
                                    }}
                                    value={tempSelectedYear !== null ? tempSelectedYear.toString() : ''}
                                />
                                <TouchableOpacity style={styles.dateInputIcon} onPress={() => showDatePicker('year')}>
                                    <Text style={styles.dateSelectionButton}>📅</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Data de Fim */}
                    <Text style={styles.modalSubTitle}> Data Fim</Text>
                    <View style={styles.dateSelectionContainer}>
                        {/* Dia */}
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.dateInputLabel}>Dia:</Text>
                            <View style={styles.dateInputAndIcon}>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="DD"
                                    keyboardType="number-pad"
                                    maxLength={2}
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            // Campo vazio, definir como null
                                            setTempEndDay(null);
                                        } else {
                                            const parsedValue = parseInt(text);
                                            setTempEndMonth(isNaN(parsedValue) ? null : parsedValue);
                                        }
                                    }}
                                    value={tempSelectedDay !== null ? tempSelectedDay.toString() : ''}
                                />
                                <TouchableOpacity style={styles.dateInputIcon} onPress={() => showDatePicker('day')}>
                                    <Text style={styles.dateSelectionButton}>📅</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Mês */}
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.dateInputLabel}>Mês:</Text>
                            <View style={styles.dateInputAndIcon}>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="MM"
                                    keyboardType="number-pad"
                                    maxLength={2}
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            // Campo vazio, definir como null
                                            setTempEndMonth(null);
                                        } else {
                                            const parsedValue = parseInt(text);
                                            setTempEndMonth(isNaN(parsedValue) ? null : parsedValue);
                                        }
                                    }}
                                    value={tempSelectedMonth !== null ? tempSelectedMonth.toString() : ''}
                                />

                                <TouchableOpacity style={styles.dateInputIcon} onPress={() => showDatePicker('month')}>
                                    <Text style={styles.dateSelectionButton}>📅</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Ano */}
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.dateInputLabel}>Ano:</Text>
                            <View style={styles.dateInputAndIcon}>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="AAAA"
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            // Campo vazio, definir como null
                                            setTempEndYear(null);
                                        } else {
                                            const parsedValue = parseInt(text);
                                            setTempEndDay(isNaN(parsedValue) ? null : parsedValue);
                                        }
                                    }}
                                    value={tempSelectedYear !== null ? tempSelectedYear.toString() : ''}
                                />
                                <TouchableOpacity style={styles.dateInputIcon} onPress={() => showDatePicker('year')}>
                                    <Text style={styles.dateSelectionButton}>📅</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Renderização condicional das opções do seletor de datas */}
                    {isDatePickerVisible && (
                        <View style={datePickerStyles.datePicker}>
                            {/* Usando o estilo do DatePicker */}
                            {activeDatePicker === 'day' ? (
                                <Picker
                                    selectedValue={tempSelectedDay}
                                    onValueChange={(itemValue) => {
                                        setTempSelectedDay(itemValue);
                                        setIsDatePickerVisible(false);
                                    }}
                                    style={datePickerStyles.picker}
                                >
                                    {getAvailableDays().map((day) => (
                                        <Picker.Item key={day} label={day.toString()} value={day} />
                                    ))}
                                </Picker>
                            ) : activeDatePicker === 'month' ? (
                                <Picker
                                    selectedValue={tempSelectedMonth}
                                    onValueChange={(itemValue) => {
                                        setTempSelectedMonth(itemValue);
                                    }}
                                    style={datePickerStyles.picker}
                                >
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <Picker.Item key={index + 1} label={(index + 1).toString()} value={index + 1} />
                                    ))}
                                </Picker>
                            ) : (
                                <Picker
                                    selectedValue={tempSelectedYear}
                                    onValueChange={(itemValue) => {
                                        setTempSelectedYear(itemValue);
                                    }}
                                    style={datePickerStyles.picker}
                                >
                                    {getAvailableYears().map((year) => (
                                        <Picker.Item key={year} label={year.toString()} value={year} />
                                    ))}
                                </Picker>
                            )}
                        </View>
                    )}

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ top: -180, width: '100%' }}>
                {toastVisible && (
                    <CustomToast message={toastMessage} onHide={() => setToastVisible(false)} type={toastType} />
                )}
            </View>
        </Modal>
    );
}
