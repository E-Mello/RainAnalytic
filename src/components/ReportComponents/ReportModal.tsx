import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { isGeneratingReportAtom, reportFormatAtom, selectedFazendaAtom, selectedPluviometerAtom, selectedTalhaoAtom } from '../../atoms/reportAtoms'; // Certifique-se de importar os átomos corretamente

import React from 'react';
import styles from '../../styles/stylesReportModal';
import { useAtom } from 'jotai';

const ReportModal: React.FC = () => {
    const [reportFormat, setReportFormat] = useAtom(reportFormatAtom);
    const [isModalVisible, setIsModalVisible] = useAtom(isGeneratingReportAtom);
    const [selectedFazenda, setSelectedFazenda] = useAtom(selectedFazendaAtom);
    const [selectedTalhao, setSelectedTalhao] = useAtom(selectedTalhaoAtom);
    const [selectedPluviometers, setSelectedPluviometers] = useAtom(selectedPluviometerAtom);

    const handleFormatSelection = (format: 'pdf' | 'csv') => {
        setReportFormat(format);
        clearAllFields();
        setIsModalVisible(!isModalVisible);
    };

    const clearAllFields = () => {
        setSelectedFazenda(null); //clear
        setSelectedTalhao(null); //clear
        setSelectedPluviometers(null); //clear
    };

    return (
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Escolha o formato do relatório:</Text>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.pdfButton]}
                        onPress={() => handleFormatSelection('pdf')}
                    >
                        <Text style={styles.modalButtonText}>PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.csvButton]}
                        onPress={() => handleFormatSelection('csv')}
                    >
                        <Text style={styles.modalButtonText}>CSV</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => {
                    setIsModalVisible(!isModalVisible);
                }}>
                    <Text style={styles.modalCloseButtonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ReportModal;
