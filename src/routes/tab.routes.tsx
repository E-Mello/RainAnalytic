import { Alert, Button, StyleSheet, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import FieldIcon from '../components/FieldIcon'
import { Icon } from 'react-native-elements'
import ModalScreen from '../components/Modal'
import RainData from '../screens/RainData'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createIconSet } from 'react-native-vector-icons'
import { isActiveModelAtom } from '../atoms/activeModelAtom'
import { useAtom } from 'jotai'

const Tab = createBottomTabNavigator();


// O TabRoutes é responsável pelas rotas em sí da aplicação, aqui definimos todas as rotas, que nesse caso, estamos tratando a navegação
// no formato de tabs (os botões na parte inferior da aplicação, alteramos as "telas", da aplicação)
export default function TabRoutes() {
    const [isActiveModel, setIsActiveModel] = useAtom(isActiveModelAtom); // Estado local para controlar a visibilidade do modal

    return (
        // headerShown: false, é uma propriedade que define se o header (cabeçalho) da aplicação será exibido ou não
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            {isActiveModel ?
                <Tab.Screen
                    name='model'
                    component={ModalScreen}
                    options={{
                        tabBarIconStyle: {
                            display: 'none',
                        },
                        tabBarStyle: {
                            display: 'none',
                        },
                        tabBarShowLabel: false,
                    }}
                /> :
                <Tab.Group >
                    <Tab.Screen
                        name='feed'
                        component={RainData}
                        options={{
                            tabBarIcon: ({ color, size }) => {
                                return <Feather name='cloud-rain' size={size} color={color} />
                            },
                            tabBarLabel: 'Dados da chuva',
                        }
                        }

                    />

                </Tab.Group>}
        </Tab.Navigator>
    )
}
