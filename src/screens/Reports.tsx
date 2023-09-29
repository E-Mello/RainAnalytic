import { ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';

import ReportForm from '../components/ReportComponents/ReportForm';
import ReportModal from '../components/ReportComponents/ReportModal';
import {
    isGeneratingReportAtom,
} from '../atoms/reportAtoms';
import styles from '../styles/styleReport';
import { useAtom } from 'jotai';

export default function Report() {
    const [isModalVisible, setIsModalVisible] = useAtom(isGeneratingReportAtom);

    return (
        <SafeAreaView style={styles.container}>
            {/* Componente de formulário para seleção de fazendas, talhões, pluviômetros, datas, etc. */}
            <ReportForm />

            {/* Modal para escolha do formato do relatório */}
            <ReportModal />

            {isModalVisible && (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </SafeAreaView>
    );
}
