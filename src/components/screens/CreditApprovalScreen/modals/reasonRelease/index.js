import * as React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Alert
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Loading from '../../../../../common/loading';
import { release as releaseFunction } from '../../../../../containers/screens/CreditApprovalScreen';

const screenHeight = Dimensions.get('window').height;

export default function ModalReasonRelease({ release, handleRelease, credits, updateCredits }) {
    const [loading, updateLoading] = React.useState(false);
    const [reason, onChangeReason] = React.useState('');
    const toggleModal = () => {
        handleRelease({ ...release, isVisible: false, callAlert: !release.callAlert });
    };
    const releaseCredit = () => {
        let newList = credits.credits.filter(e => e.checked === false);
        updateCredits({ ...credits, newResult: !credits.newResult, credits: [...newList] });
    }
    return (
        <Modal
            style={{ margin: 0, justifyContent: 'flex-start' }}
            isVisible={release.isVisible}
            animationType={'slide'}
            transparent
            animationInTiming={400}
            animationOutTiming={200}
        >
            <Loading loading={loading} />
            <View style={styles.backdrop} />
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Lí do phê duyệt</Text>
                        <TextInput
                            multiline={true}
                            textAlignVertical={'top'}
                            style={{ flex: 1 }}
                            autoFocus={true}
                            onChangeText={onChangeReason}
                            value={reason}
                        />
                        <View style={styles.bottom}>
                            <TouchableOpacity
                                style={{ ...styles.btnBottom, borderRightWidth: 1 }}
                                delayPressIn={0}
                                onPress={async () => {
                                    updateLoading(true);
                                    const result = await releaseFunction({ vbeln: [...release.listRelease], reason: reason });
                                    updateLoading(false);
                                    if (result.type == 'S') {
                                        setTimeout(() => {
                                            Alert.alert('Phê duyệt thành công',
                                                'Phê duyệt tín dụng thành công',
                                                [
                                                    {
                                                        text: 'OK', onPress: () => {
                                                            releaseCredit();
                                                            handleRelease({
                                                                listRelease: [],
                                                                isVisible: false,
                                                            });
                                                        }
                                                    }
                                                ],
                                                { cancelable: false }
                                            );
                                        }, 200)
                                    } else {
                                        setTimeout(() => {
                                            Alert.alert('Phê duyệt thất bại',
                                                'Phê duyệt tín dụng thất bại',
                                                [
                                                    {
                                                        text: 'OK', onPress: () => {
                                                            handleRelease({
                                                                listRelease: [...release.listRelease],
                                                                isVisible: false,
                                                            })
                                                        }
                                                    }
                                                ],
                                                { cancelable: false }
                                            );
                                        }, 200)
                                    }
                                }}
                            >
                                <AntDesign name='checkcircleo' size={35} color={'green'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnBottom}
                                delayPressIn={0}
                                onPress={toggleModal}
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
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1
    },
    title: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold',
        fontSize: 18
    },
    btnBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});