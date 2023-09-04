import { Alert, StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { Feather } from '@expo/vector-icons'
import Login from '../screens/Login';
import StackRoutes from './stack.routes';
import TabRoutes from './tab.routes'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { supabase } from '../lib/supabase'

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        // O Drawer.Screen é responsável por definir as rotas do drawer, que é o menu lateral da aplicação
        // Nesse caso não tem como deixar o headerShown: false, pois irá ocultar o icone para abrir o drawer
        // Dessa forma, para tirar a escrita, devemos deixar o title como null, ai só vai aparecer o icone para abrir o drawer
        <Drawer.Navigator screenOptions={{ title: '' }}>
            <Drawer.Screen
                name='Home'
                component={TabRoutes} // Nesse caso, estamos chamando o TabRoutes, que é o arquivo que contém as rotas das tabs, ao invés de renderizar uma nova interface,
                // estamos pedindo para ele renderizar uma nova rota
                options={{
                    drawerIcon: ({ color, size }) => {
                        return <Feather name='home' size={size} color={color} />
                    },
                    drawerLabel: 'Inicio'
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
})