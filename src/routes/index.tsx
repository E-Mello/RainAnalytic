import { useEffect, useState } from 'react'

import DrawerRoutes from './drawer.routes'
import Login from '../screens/Login'
import { NavigationContainer } from '@react-navigation/native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useSupabase } from '../context/useSupabase'

// import TabRoutes from './tab.routes'


// O arquivo de rotas é responsável pelo contexto de navegação da aplicação
export default function Routes() {
    const [session, setSession] = useState<Session | null>(null)
    // We check if the user is logged in
    const { isLoggedIn } = useSupabase();


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        // Iniciamente, coloque apenas  <TabRoutes /> aqui, para interpretar a navegação entre as tabs
        // Após isto, defini que <DrawerRoutes /> vai chamar a <TabRoutes /> dessa forma, criando um alinhamento de tipos de rota
        <NavigationContainer independent={true}>
            {session && session.user ? <DrawerRoutes /> : <Login />}
        </NavigationContainer>
    )
}