import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get("window").height;

export default function HeaderBackground() {
    return (
        <View style={styles.container}>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4169E1',
        position: 'absolute',
        top: 0,
        height: screenHeight / 3,
        width: '100%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    }
});