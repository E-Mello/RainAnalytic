import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { User } from '@supabase/supabase-js'
import { supabase } from "../lib/supabase";

export default function Feed() {
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
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        }

        fetchUser(); // Chama a função para buscar os detalhes do usuário
    }, []); // O segundo argumento [] assegura que useEffect seja chamado apenas uma vez


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed</Text>
            {user && (
                <View key={user.id}>
                    <Text>User ID: {user.id}</Text>
                    <Text>User Email: {user.email}</Text>
                    <Text>User Phone: {user.phone}</Text>
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
})