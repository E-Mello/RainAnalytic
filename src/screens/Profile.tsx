import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { Session, User } from '@supabase/supabase-js'

import { ScrollView } from "react-native-gesture-handler";
import { UserProfile } from "../types/Profile";
import styles from '../styles/styleProfile'
import { supabase } from "../lib/supabase";
import { useAuth } from "../components/AuthComponents/AuthSupabase";

export default function Profile() {
    const { session, user, signOut } = useAuth(); // Obter sessão e usuário do contexto

    const [profileData, setProfileData] = useState<UserProfile | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Atualizar o estado com os dados do usuário da sessão
        if (user) {
            setUsername(user.user_metadata?.username || '');
            setWebsite(user.user_metadata?.website || '');
            setFullName(user.user_metadata?.full_name || '');
            setEmail(user.email || '');
            setPhone(user.user_metadata?.phone || '');
        }
    }, [user]);

    useEffect(() => {
        if (session) {
            getProfile();
        }
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!user) throw new Error('No user on the session!');

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`*`)
                .eq('id', user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setProfileData(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert("Erro ao buscar informações do perfil:", error.message);
            }
        } finally {
            setLoading(false);
        }
    }


    async function updateProfile() {
        try {
            setLoading(true);
            if (!user) throw new Error('No user on the session!');

            // Buscar os valores atuais dos campos do estado profileData
            const currentUsername = profileData?.username || '';
            const currentFullName = profileData?.full_name || '';
            const currentWebsite = profileData?.website || '';
            const currentEmail = profileData?.email || '';
            const currentPhone = profileData?.phone || '';

            const updates = {
                id: user.id,
                username: username || currentUsername, // Usar o valor alterado ou o valor atual (Cambiarra para não dar erro de campo vazio)
                full_name: fullName || currentFullName, // Usar o valor alterado ou o valor atual (Cambiarra para não dar erro de campo vazio)
                email: email || currentEmail, // Usar o valor alterado ou o valor atual (Cambiarra para não dar erro de campo vazio)
                phone: phone || currentPhone, // Usar o valor alterado ou o valor atual (Cambiarra para não dar erro de campo vazio)
                website: website || currentWebsite, // Usar o valor alterado ou o valor atual (Cambiarra para não dar erro de campo vazio)
                avatar_url: profileData?.avatar_url,
                updated_at: new Date(),
            };

            let { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }

            // Atualizar profileData com os novos dados
            setProfileData((prevProfileData) => ({
                ...prevProfileData!,
                username: updates.username,
                full_name: updates.full_name,
                email: updates.email,
                phone: updates.phone,
                website: updates.website,
            }));

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }



    return (
        <ScrollView >
            <View style={styles.container}>
                {/* Avatar, Username, Full Name, Website */}
                {profileData && (
                    <View style={[styles.verticallySpaced]} key={profileData.id}>
                        <View style={styles.avatarView}>
                            <Image style={styles.avatar} source={{ uri: profileData?.avatar_url || 'https://lh3.googleusercontent.com/a/AAcHTtcFeADmcO_jDcUPCeMUIjlxtoJghCXpQLl8fdwxbJeR4g=s288-c-no' }} />
                        </View>
                        <Input
                            style={styles.input}
                            label="Username"
                            defaultValue={profileData?.username || ''}
                            onChangeText={(text) => setUsername(text)}
                        />
                        <Input
                            style={styles.input}
                            label="Nome Completo"
                            defaultValue={profileData?.full_name || ''}
                            onChangeText={(text) => setFullName(text)}
                        />
                        <Input
                            style={styles.input}
                            label="Website"
                            defaultValue={profileData.website || ''}
                            onChangeText={(text) => setWebsite(text)}
                        />
                        <Input
                            style={styles.input}
                            label="Email"
                            defaultValue={profileData.email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Input
                            style={styles.input}
                            label="Phone"
                            defaultValue={profileData.phone}
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>
                )}

                {/* Botão de edição/atualização */}
                <View style={[styles.verticallySpaced, styles.mt20]}>
                    <Button
                        title={loading ? 'Loading ...' : 'Update'}
                        onPress={() => updateProfile()}
                        disabled={loading}
                    />
                </View>
            </View>
        </ScrollView>
    );
}