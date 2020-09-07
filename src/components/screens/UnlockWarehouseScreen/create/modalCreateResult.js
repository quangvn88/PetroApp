import * as React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ModalCreateResult({ result, handleResult }) {
    return (
        <Modal
            isVisible={result.isVisible}
            // transparent
            animationType={'slide'}
            animationInTiming={400}
            animationOutTiming={200}
        >
            <SafeAreaView>
                {/* Button close */}
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={() => handleResult({ ...result, isVisible: false })}
                    >
                        <AntDesign name='closecircleo' size={35} color={'red'} />
                    </TouchableOpacity>
                </View>
                {/* Content */}
                <FlatList
                    data={result.createData}
                    renderItem={({ item, index }) =>
                        <Text style={styles.textStyle}>{item}</Text>
                    }
                    keyExtractor={(item, index) => `${index}`}
                />
            </SafeAreaView>
        </Modal >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    textStyle: {
        flex: 1,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        fontSize: 20,
        paddingBottom: 30
    },
    btnClose: {
        padding: 5
    }
});

