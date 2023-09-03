import { Feather } from '@expo/vector-icons'
import Profile from '../screens/Profile';
import TabRoutes from './tab.routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        // O Stack.Navigator é responsável por definir as rotas do drawer, que é o menu lateral da aplicação
        // Para utilizar essa estratégia e funcionar, é necessário adicionar o StackRoutes() dentro do DrawerRoutes(), dessa forma,
        // ele vai renderizar
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Home'
                component={Profile}
            />

        </Stack.Navigator>
    )
}