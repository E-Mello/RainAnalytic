/* load the codepage support library for extended support with older formats  */
import {
    ActivityIndicator,
    Button,
    Modal,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { endDateAtom, startDateAtom } from "../atoms/dateForReports";

import CustomDatePicker from "../components/CustomDatePicker";
import CustomToast from "../components/CustomToast";
import PDFView from 'react-native-pdf';
import { Picker } from "@react-native-picker/picker";
import RNFS from 'react-native-fs';
import { format } from 'date-fns';
import parse from 'csv-parse/lib/sync'; // Importe a função 'sync' para análise síncrona
import ptBR from 'date-fns/locale/pt-BR';
import { stringify } from 'csv-stringify/lib/sync';
import styles from "../styles/styleReports";
import { supabase } from "../lib/supabase";
import { useAtom } from "jotai";

export default function Report() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [
        toastType,
        setToastType,
    ] = useState<undefined | "info" | "error" | "success">(undefined);

    const [isStartDateAtom, setIsStartDateAtom] = useAtom(startDateAtom)
    const [isEndDateAtom, setIsEndDateAtom] = useAtom(startDateAtom)

    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    0

    const [selectedFazenda, setSelectedFazenda] = useState("");
    const [selectedTalhao, setSelectedTalhao] = useState("");
    const [selectedPluviometer, setSelectedPluviometer] = useState("");
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [reportVisible, setReportVisible] = useState(false);
    const [reportFormat, setReportFormat] = useState<'pdf' | 'csv' | null>(null);

    // Defina as constantes para o URI do relatório e para atualizá-lo
    const [reportUri, setReportUri] = useState<string | null>(null);

    const [fazendas, setFazendas] = useState<{ id: any; nome: any }[]>([]);
    const [talhoes, setTalhoes] = useState<{ id: any; nome: any }[]>([]);
    const [pluviometers, setPluviometers] = useState<{ id: any; nome: any }[]>(
        []
    );

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Estado para controlar o indicador de carregamento
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    // Estados para controlar as datas de início e término
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
        null
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

    // Função para mostrar o CustomDatePicker
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const showCustomToast = (
        message: string,
        type?: "info" | "error" | "success"
    ) => {
        setToastMessage(message);
        setToastVisible(true);

        setTimeout(() => {
            setToastVisible(false);
        }, 3000);

        setToastType(type);
    };

    useEffect(() => {
        loadFazendas();
    }, []);

    const loadFazendas = async () => {
        try {
            const { data: fazendas, error } = await supabase
                .from("fazenda")
                .select("id, nome");
            if (error) {
                showCustomToast("Erro ao consultar as fazendas:", "error");
            } else {
                setFazendas(fazendas || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de fazendas:", "error");
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
                showCustomToast("Erro ao consultar os talhões:", "error");
            } else {
                setTalhoes(talhoes || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de talhões:", "error");
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
                showCustomToast("Erro ao consultar os pluviômetros:", "error");
            } else {
                setPluviometers(pluviometers || []);
            }
        } catch (error) {
            showCustomToast("Erro ao carregar a lista de pluviômetros:", "error");
        }
    };

    useEffect(() => {
        setIsButtonDisabled(!(selectedPluviometer && selectedDay));
    }, [selectedPluviometer, selectedDay]);

    const openReportModal = () => {
        setModalVisible(true);
    };

    const closeReportModal = () => {
        setModalVisible(false);
    };

    const fetchReportData = async (startDate: Date, endDate: Date, selectedPluviometers: string[] = []) => {
        try {
            // Faça a consulta ao banco de dados usando a função select do Supabase.
            const query = supabase
                .from('sua_tabela')
                .select('*')
                .gte('data', startDate)
                .lte('data', endDate);

            // Se houver IDs de pluviômetros selecionados, adicione a cláusula "in" à consulta.
            if (selectedPluviometers.length > 0) {
                query.in('pluviometro_id', selectedPluviometers);
            }

            const { data, error } = await query;

            if (error) {
                throw new Error("Erro ao buscar dados do relatório.");
            }

            return data;
        } catch (error) {
            throw error;
        }
    };




    const generateReport = async () => {
        if (!selectedStartDate || !selectedEndDate || !selectedPluviometer) {
            showCustomToast('Selecione datas e um pluviômetro válidos para gerar o relatório', 'error');
            return;
        }

        // Define isGeneratingReport como true para exibir o indicador de carregamento
        setIsGeneratingReport(true);

        try {
            // Realize a consulta ao banco de dados para buscar os registros de precipitação
            // com base nas datas selecionadas (selectedStartDate e selectedEndDate).
            const reportData = await fetchReportData(selectedStartDate, selectedEndDate, [selectedPluviometer]);

            // Define isGeneratingReport como false para esconder o indicador de carregamento
            setIsGeneratingReport(false);

            // Exibe um modal para o usuário escolher o formato do relatório
            setModalVisible(true);
        } catch (error) {
            // Lida com erros durante a geração do relatório.
            setIsGeneratingReport(false);
            showCustomToast('Erro ao gerar o relatório. Tente novamente.', 'error');
        }
    };

    const generateFormattedReport = async () => {
        if (!reportFormat) {
            showCustomToast('Selecione o formato do relatório (PDF ou CSV).', 'error');
            return;
        }

        setIsGeneratingReport(true);

        try {
            if (reportFormat === 'pdf') {
                // Gere o relatório em formato PDF
                const pdfFileName = 'relatorio.pdf';
                const pdfFilePath = `${RNFS.ExternalDirectoryPath}/${pdfFileName}`;

                // Aqui você deve adicionar a lógica para criar o relatório PDF com base nos dados (reportData)
                // Substitua esta parte com a lógica real para gerar o PDF
                // Exemplo: const pdfData = generatePDF(reportData);
                const pdfData = ''; // Substitua com os dados do relatório em formato PDF

                await RNFS.writeFile(pdfFilePath, pdfData, 'base64');

                // Defina o URI do relatório em PDF
                setReportUri(pdfFilePath);
            } else if (reportFormat === 'csv') {
                // Gere o relatório em formato CSV
                // Use a biblioteca csv-stringify para converter os dados do relatório em CSV
                const csvData = stringify(reportData, { header: true });

                const csvFileName = 'relatorio.csv';
                const csvFilePath = `${RNFS.ExternalDirectoryPath}/${csvFileName}`;

                await RNFS.writeFile(csvFilePath, csvData, 'utf8');

                // Defina o URI do relatório em CSV
                setReportUri(csvFilePath);
            }

            setIsGeneratingReport(false);
            setModalVisible(false);
            setReportVisible(true);
        } catch (error) {
            setIsGeneratingReport(false);
            showCustomToast('Erro ao gerar o relatório. Tente novamente.', 'error');
        }
    };


    return (
        <SafeAreaView style={styles.container}>
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
                        selectedValue={selectedPluviometer}
                        onValueChange={(itemValue) =>
                            setSelectedPluviometer(itemValue)
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

            {selectedPluviometer && (
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.dateText}>
                            Clique para selecionar periodo do relatorio
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {isDatePickerVisible && (
                <CustomDatePicker
                    visible={isDatePickerVisible}
                    selectedDate={selectedDate}
                    onClose={() => setDatePickerVisible(false)}
                    onDateChange={(newDate) => {
                        setSelectedDate(newDate);
                        setDatePickerVisible(false);
                    }}
                />
            )}

            <View style={styles.dateDisplayContainer}>
                <Text style={styles.dateLabel}>Data de Início:</Text>
                <Text style={styles.dateText}>
                    {isStartDateAtom
                        ? format(isStartDateAtom, 'dd-MM-yyyy', { locale: ptBR }) // Formate a data para "DD-MM-YYYY" em português (pt-BR)
                        : 'Não selecionada'}
                </Text>
            </View>
            <View style={styles.dateDisplayContainer}>
                <Text style={styles.dateLabel}>Data de Término:</Text>
                <Text style={styles.dateText}>
                    {isEndDateAtom
                        ? format(isEndDateAtom, 'dd-MM-yyyy', { locale: ptBR }) // Formate a data para "DD-MM-YYYY" em português (pt-BR)
                        : 'Não selecionada'}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.generateReportButton}
                    onPress={generateReport}
                    disabled={!selectedStartDate || !selectedEndDate || isGeneratingReport}
                >
                    <Text style={styles.generateReportButtonText}>
                        {isGeneratingReport ? "Gerando Relatório..." : "Gerar Relatório"}
                    </Text>
                </TouchableOpacity>
            </View>


            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Escolha o formato do relatório:</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setReportFormat('pdf')}
                        >
                            <Text style={styles.modalButtonText}>PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setReportFormat('csv')}
                        >
                            <Text style={styles.modalButtonText}>CSV</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={generateFormattedReport}
                    >
                        <Text style={styles.modalCloseButtonText}>Gerar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            {isGeneratingReport && (
                <ActivityIndicator size="large" color="#0000ff" />
            )}

            {/* Toast */}
            {toastVisible && (
                <CustomToast
                    message={toastMessage}
                    onHide={() => setToastVisible(false)}
                    type={toastType}
                />
            )}
        </SafeAreaView>
    );
}