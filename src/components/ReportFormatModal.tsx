import { Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

type ReportFormatModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onGenerate: (format: string) => void;
};

export default function ReportFormatModal({ isVisible, onClose, onGenerate }: ReportFormatModalProps) {
  const [selectedFormat, setSelectedFormat] = useState("pdf"); // Inicialmente selecionado como PDF

  const generateReport = () => {
    // Chama a função de geração de relatório com o formato selecionado
    onGenerate(selectedFormat);
    onClose(); // Fecha o modal
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View>
        <Text>Selecione o formato do relatório:</Text>
        <TouchableOpacity onPress={() => setSelectedFormat("pdf")}>
          <Text>PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedFormat("csv")}>
          <Text>CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={generateReport}>
          <Text>Gerar Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
