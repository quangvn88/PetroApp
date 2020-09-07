import * as React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Dimensions,
    SafeAreaView
} from 'react-native';

import SearchSelectOption from './searchSelectOption.js';

const screenHeight = Dimensions.get('window').height;

export default function ModalSelectMultiBukrs({
    placeholder,
    handleKunnrs,
    fromBukrs
}) {
    return (
        <Modal
            visible={fromBukrs.isVisible}
            animationType={'slide'}
            transparent
            animationInTiming={400}
            animationOutTiming={200}
        >
            <View style={styles.backdrop} />
            {/* Content */}
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <SearchSelectOption
                            placeholder={placeholder}
                            handleKunnrs={handleKunnrs}
                            fromBukrs={fromBukrs}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: screenHeight / 2,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    backdrop: {
        height: screenHeight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.5,
        backgroundColor: 'black',
    },
});