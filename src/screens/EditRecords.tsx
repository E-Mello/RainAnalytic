import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import EditFarm from '../components/EditRegistrations/EditFarm';
import EditField from '../components/EditRegistrations/EditField';
import EditRainGauge from '../components/EditRegistrations/EditRainGauge';
import React from 'react';

export default function EditRecords() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 2 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>Edição de Fazenda</Text>
                <EditFarm />

                <View style={{ borderTopWidth: 1, marginVertical: 16 }}></View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>Edição de Talhão</Text>
                <EditField />

                <View style={{ borderTopWidth: 1, marginVertical: 16 }}></View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>Edição de Pluviômetro</Text>
                <EditRainGauge />
            </ScrollView>
        </SafeAreaView>
    );
}
