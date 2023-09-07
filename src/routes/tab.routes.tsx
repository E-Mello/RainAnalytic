import Dashboard from '../screens/Dashboard'
import { Feather } from '@expo/vector-icons'
import New from '../screens/New'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

// O TabRoutes é responsável pelas rotas em sí da aplicação, aqui definimos todas as rotas, que nesse caso, estamos tratando a navegação
// no formato de tabs (os botões na parte inferior da aplicação, alteramos as "telas", da aplicação)
export default function TabRoutes() {
    return (
        // headerShown: false, é uma propriedade que define se o header (cabeçalho) da aplicação será exibido ou não
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='feed'
                component={Dashboard}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name='home' size={size} color={color} />
                    },
                    tabBarLabel: 'Inicio'
                }}
            />

            <Tab.Screen
                name='new'
                component={New}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name='plus' size={size} color={color} />
                    },
                    tabBarLabel: 'Novo'
                }}
            />
        </Tab.Navigator>
    )
}
