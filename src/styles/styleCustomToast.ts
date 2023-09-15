import { StyleSheet } from "react-native-windows";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 80,
    },
    labelContainer: {
        paddingHorizontal: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        height: '100%',

    },
    content: {
        paddingLeft: 8,
        width: '90%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 4,
    },
    message: {
        fontSize: 14,
        color: 'black',
    },
});

export default styles;