import 'react-native-url-polyfill/auto'

import { useEffect, useState } from 'react'

import Account from '../components/Account'
import Auth from '../components/Auth'
import { NavigationContainer } from '@react-navigation/native'
import Routes from '../routes'
import { Session } from '@supabase/supabase-js'
import { View } from 'react-native'
import { supabase } from '../lib/supabase'

export default function Login() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <NavigationContainer independent={true}>
            <Auth />
        </NavigationContainer>
    )
}