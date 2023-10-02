import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { fazendasAtom, pluviometersAtom, selectedFazendaAtom, selectedPluviometerAtom, selectedTalhaoAtom, talhoesAtom } from '../atoms/rainDataAtoms';
import { useEffect, useState } from 'react';

import Avatar from '../components/ProfileComponents/Avatar';
import BarnIcon from '../components/icons/BarnIcon';
import Colors from '../constants/Colors';
import CreateFarm from '../screens/ManageRegistrations';
import EditRecords from '../screens/EditRecords';
import { Feather } from '@expo/vector-icons'
import FieldIcon from '../components/icons/FieldIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from '@react-navigation/native';
import Login from '../screens/Login';
import ModalScreen from '../components/RainDataComponents/SwitchFarmModal';
import Report from '../screens/Reports';
import StackRoutes from './stack.routes';
import TabRoutes from './tab.routes'
import { TapGestureHandler } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { isActiveModelAtom } from '../atoms/activeModelAtom';
import { supabase } from '../lib/supabase'
import { useAtom } from 'jotai';

const Drawer = createDrawerNavigator();

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function DrawerRoutes() {

    // Others consts
    const colorScheme = useColorScheme();
    const [isActiveModel, setIsActiveModel] = useAtom(isActiveModelAtom); // Estado local para controlar a visibilidade do modal


    const openModal = () => {
        setIsActiveModel(true);
        console.log('====================================');
        console.log('Modal aberto');
        console.log('====================================');
    };

    return (
        // O Drawer.Screen é responsável por definir as rotas do drawer, que é o menu lateral da aplicação
        // Nesse caso não tem como deixar o headerShown: false, pois irá ocultar o icone para abrir o drawer
        // Dessa forma, para tirar a escrita, devemos deixar o title como null, ai só vai aparecer o icone para abrir o drawer
        <Drawer.Navigator screenOptions={{
            drawerIcon: ({ color, size }) => {
                return <Feather name='activity' size={size} color={color} />
            },
            headerTitleAlign: 'center',
            drawerStatusBarAnimation: 'fade',
            drawerStyle: {
                paddingTop: 20,
            },


        }}>
            <Drawer.Screen
                name='Home'
                component={TabRoutes} // Nesse caso, estamos chamando o TabRoutes, que é o arquivo que contém as rotas das tabs, ao invés de renderizar uma nova interface,
                // estamos pedindo para ele renderizar uma nova rota
                options={{
                    drawerIcon: ({ color, size }) => {
                        return <Feather name='home' size={size} color={color} />
                    },
                    drawerLabel: 'Inicio',
                    headerTitle: () => (
                        <TouchableOpacity onPress={openModal} style={styles.openModal}>
                            <Text>Clique para alterar a fazenda selecionada</Text>
                            <BarnIcon />
                        </TouchableOpacity>
                    )
                }}
            />
            <Drawer.Screen
                name='CreateFarm'
                component={CreateFarm}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Feather name='plus' size={size} color={color} />
                    ),
                    drawerLabel: 'Gerenciar Cadastros',
                }}
            />

            <Drawer.Screen
                name='EditFarm'
                component={EditRecords}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Feather name='edit' size={size} color={color} />
                    ),
                    drawerLabel: 'Editar Registros',
                }}
            />

            <Drawer.Screen
                name='Reports'
                component={Report}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Feather name='printer' size={size} color={color} />
                    ),
                    drawerLabel: 'Relatórios',
                }}
            />
            <Drawer.Screen
                name='Profile'
                component={StackRoutes} // Nesse caso, estamos chamando o StackRoutes, que é o arquivo que contém as rotas das stacks,
                // ao invés de renderizar uma nova interface, para que possamos navegar entre as opções do drawer
                options={{
                    drawerIcon: ({ color, size }) => {
                        return <Feather name='user' size={size} color={color} />
                    },
                    drawerLabel: 'Meu Perfil'
                }}

            />
            <Drawer.Screen
                name='Logout'
                options={{
                    drawerLabel: 'Logout',
                    drawerIcon: ({ color, size }) => (
                        <Feather name='log-out' size={size} color={color} />
                    ),
                }}
            >
                {() => (
                    <View style={styles.verticallySpaced}>
                        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
                    </View>
                )}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    openModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: 305,
        left: -10,
    },
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    modalFather: {
        width: '100%',
        height: '100%',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    closeButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
    },
})