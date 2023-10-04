import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import React, { useState } from 'react';

import { supabase } from '../../lib/supabase';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoading(false);
        } else {
            Alert.alert('Success', "You're logged in!");
            console.log("You're logged in!");
        }
    }

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert('Error', error.message);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Input
                label="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize="none"
            />
            <Input
                label="Password"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Sign in with Password"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                    buttonStyle={[styles.button, styles.signinButton]}
                />
                <Button
                    title="Sign up with Email"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                    buttonStyle={[styles.button, styles.signUpButton]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center', // Centralize os botões
        height: 40,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    signinButton: {
        backgroundColor: '#007AFF',
    },
    signUpButton: {
        backgroundColor: '#34C759',
    },
});
