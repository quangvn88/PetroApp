import * as React from 'react';
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView,
    Dimensions,
    Text
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const screenHeight = Dimensions.get('window').height;

import Type from './typeList';

export default function ModalSelectType({ type, onChangeType }) {
    return (
        <Modal
            isVisible={type.isVisible}
            transparent
            animationType={'slide'}
            animationInTiming={400}
            animationOutTiming={200}
        >
            <View style={styles.backdrop} />
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={styles.textStyle}>Type</Text>
                        <View style={{ flex: 1 }}>
                            <Type
                                onChangeType={onChangeType}
                            />
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity
                                delayPressIn={0}
                                onPress={() => onChangeType({
                                    ...type,
                                    isVisible: false
                                })}
                            >
                                <AntDesign name='closecircleo' size={35} color={'red'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
    );
};

const styles = StyleSheet.create({
    container: {
        height: screenHeight / 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    textStyle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
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