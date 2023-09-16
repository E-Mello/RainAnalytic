import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import React from 'react';
import RegisterFarm from '../components/RegistrationControl/RegisterFarm';
import RegisterField from '../components/RegistrationControl/RegisterField';
import RegisterRainGauge from '../components/RegistrationControl/RegisterPluviometer';

export default function ManageRegistrations() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 2 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>Registro de Fazenda</Text>
                <RegisterFarm />

                <View style={{ borderTopWidth: 1, marginVertical: 16 }}></View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>Registro de Talhão</Text>
                <RegisterField />

                <View style={{ borderTopWidth: 1, marginVertical: 16 }}></View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16 }}>Registro de Pluviômetro</Text>
                <RegisterRainGauge />
            </ScrollView>
        </SafeAreaView>
    );
}
