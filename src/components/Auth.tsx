import { Alert, StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import React, { useState } from 'react'

import { supabase } from '../lib/supabase'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
            setLoading(false)
        } else {
            Alert.alert("You're logged in!")
            console.log("You're logged in!")
        }
    }

    async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.containerButtons}>
                <View style={[styles.verticallySpaced, styles.loginButton]}>
                    <Button title="Sign in with Password" disabled={loading} onPress={() => signInWithEmail()} />
                </View>
                <View style={[styles.verticallySpaced, styles.loginButton]}>
                    <Button title="Sign up with Email" disabled={loading} onPress={() => signUpWithEmail()} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
        width: '85%',
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
    },
    mt20: {
        marginTop: 20,
    },
    loginButton: {
        width: 100,
    },
    containerButtons: {
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        verticalAlign: 'middle',
        textAlignVertical: 'center',
        justifyContent: 'space-between',
        width: 250,
    }
})