import * as React from 'react';
import {
    View,
    Animated,
    Text,
    StyleSheet
} from 'react-native';

export default function Warning({ warning }) {
    const shakeAnimation = new Animated.Value(0);
    const startShake = () => {
        let times = 0;
        let id = setInterval(() => {
            if (times == 1)
                clearInterval(id);
            times++;
            Animated.sequence([
                Animated.timing(shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -5, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
            ]).start();
        }, 200);
    };
    React.useEffect(() => {
        if (warning !== '')
            startShake();
    });
    return (
        <View style={{ paddingVertical: 10 }}>
            <Animated.View style={{ alignItems: 'center', transform: [{ translateX: shakeAnimation }] }}>
                <Text style={styles.textWarning}>{warning}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    textWarning: {
        paddingHorizontal: 30,
        color: '#e3610b'
    }
});