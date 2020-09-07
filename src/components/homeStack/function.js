import React from 'react';
import {
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';

export default function Function(props) {
    const { functionProps, onPress, imageSource } = props;
    return (
        <TouchableOpacity
            style={Platform.OS != 'ios' ? styles.containerFunction : styles.containerIOS}
            onPress={onPress}
            delayPressIn={0}
        >
            <Image
                style={styles.Image}
                source={imageSource}
            />
            <Text style={styles.title}>{functionProps.title}</Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    containerFunction: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: 10,
        margin: 5,
        padding: 20,
        paddingHorizontal: 10,
        elevation: 3//box shadow for android
    },
    containerIOS: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: 10,
        margin: 5,
        padding: 20,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    Image: {
        width: 70,
        height: 70
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 13
    }
});