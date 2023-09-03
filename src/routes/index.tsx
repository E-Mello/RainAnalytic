import DrawerRoutes from './drawer.routes'
import { NavigationContainer } from '@react-navigation/native'

// import TabRoutes from './tab.routes'


// O arquivo de rotas é responsável pelo contexto de navegação da aplicação
export default function Routes() {
    return (
        // Iniciamente, coloque apenas  <TabRoutes /> aqui, para interpretar a navegação entre as tabs
        // Após isto, defini que <DrawerRoutes /> vai chamar a <TabRoutes /> dessa forma, criando um alinhamento de tipos de rota
        <NavigationContainer>
            <DrawerRoutes />
        </NavigationContainer>
    )
}