import { Feather } from '@expo/vector-icons'
import StackRoutes from './stack.routes';
import TabRoutes from './tab.routes'
import { createDrawerNavigator } from '@react-navigation/drawer'

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
                        return <Feather name='plus' size={size} color={color} />
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

        </Drawer.Navigator>
    )
}