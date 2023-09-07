import { Feather } from '@expo/vector-icons'
import RainData from '../screens/RainData'
import StorageRain from '../screens/StorageRain'
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
                component={RainData}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name='cloud-rain' size={size} color={color} />
                    },
                    tabBarLabel: 'Dados da chuva'
                }}
            />

            <Tab.Screen
                name='new'
                component={StorageRain}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name='cloud' size={size} color={color} />
                    },
                    tabBarLabel: 'Armazenamento da chuva'
                }}
            />
        </Tab.Navigator>
    )
}
