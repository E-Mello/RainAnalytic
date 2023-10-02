import { Image, StyleSheet, View } from 'react-native';

import React from 'react';

const Avatar = () => {
    return (
        <View style={styles.avatarView}>
            <Image style={styles.avatar} source={{ uri: 'https://lh3.googleusercontent.com/a/AAcHTtcFeADmcO_jDcUPCeMUIjlxtoJghCXpQLl8fdwxbJeR4g=s288-c-no' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    avatarView: {
        width: "100%",
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
    },
});

export default Avatar;
