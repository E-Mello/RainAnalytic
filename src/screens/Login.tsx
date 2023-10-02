import 'react-native-url-polyfill/auto'

import { useEffect, useState } from 'react'

import Account from '../components/ProfileComponents/Account'
import Auth from '../components/AuthComponents/Auth'
import { NavigationContainer } from '@react-navigation/native'
import Routes from '../routes'
import { Session } from '@supabase/supabase-js'
import { View } from 'react-native'
import { supabase } from '../lib/supabase'

export default function Login() {
    return (
        <NavigationContainer independent={true}>
            <Auth />
        </NavigationContainer>
    )
}