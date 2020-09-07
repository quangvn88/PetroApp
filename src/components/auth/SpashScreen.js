import * as React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    Dimensions
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
export function SplashScreen() {
    return (
        <View style={styles.containerImage}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Image style={styles.image} source={require('../../assets/Splash.jpg')}></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    containerImage: {
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 170,
        height: 150
    }
});