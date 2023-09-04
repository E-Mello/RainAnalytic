import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { Session, User } from '@supabase/supabase-js'

import { ScrollView } from "react-native-gesture-handler";
import { UserProfile } from "../types/Profile";
import styles from '../styles/styleProfile'
import { supabase } from "../lib/supabase";

export default function Profile({ session }: { session: Session | null }) {
    // Estado para armazenar os dados do perfil
    const [profileData, setProfileData] = useState<UserProfile | undefined>(Object);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [website, setWebsite] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Função assíncrona para buscar os detalhes do usuário
        async function fetchUser() {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                setUser(user);
                if (error) {
                    console.log(error);
                };
                getProfile();
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        }

        // Verifica se user é null, se for, chama fetchUser
        if (user === null) {
            fetchUser();
        }
    }, [user]); // O segundo argumento [] assegura que useEffect seja chamado apenas uma vez


    useEffect(() => {
        if (session) {
            getProfile();
        };
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
                // Remova as atribuições iniciais dos estados aqui
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

            const updates = {
                id: user.id,
                username,
                full_name: fullName,
                email,
                phone,
                website,
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
                username,
                full_name: fullName,
                email,
                phone,
                website,
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