import * as React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Loading from '../../../../common/loading';

import { removePo } from '../../../../containers/screens/PoScreen';


export default function Item({ item, index, handleResult, result }) {
    const [loading, updateLoading] = React.useState(false);
    const updateRemovePo = () => {
        let newData = [...result.data];
        newData.splice(index, 1);
        handleResult({
            ...result,
            data: [...newData]
        });
    };
    return (
        <View style={{ flexDirection: 'row' }}>
            <Loading loading={loading} />
            <View style={{ ...styles.titleTable, flex: 5 }}>
                <Text>{item.BEDAT}</Text>
            </View>
            <View style={{ ...styles.titleTable, flex: 4 }}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Thời gian</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{item.TIME_F}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 2 }}>
                <Text>{item.GJAHR}</Text>
            </View>
            <View style={{ ...styles.titleTable, flex: 3 }}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Tháng</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{item.ZMONTH}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <Text>{item.PERIOD_NO}</Text>
            </View>
            <View style={{ ...styles.titleTable }}>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={async () => {
                        const permission = await checkPermission();
                        if (permission)
                            Alert.alert('Xóa chu kỳ giá thất bại', 'Tài khoản của bạn không có quyền thực hiện chức năng này');
                        else {
                            updateLoading(true);
                            const resultRemove = await removePo({
                                bedat: item.BEDAT,
                                timef: item.TIME_F,
                                period: item.PERIOD_NO
                            });
                            updateLoading(false);
                            if (resultRemove.type === 'S') {
                                // remove and update warning
                                setTimeout(() => {
                                    Alert.alert('Xóa chu kỳ giá thành công',
                                        resultRemove.warning,
                                        [
                                            {
                                                text: "OK", onPress: () =>
                                                    updateRemovePo()
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }, 200)
                            } else {
                                handleResult({
                                    ...result,
                                    warning: resultRemove.warning
                                })
                            }
                        }
                    }}
                >
                    <Icon name='delete' size={28} color='red' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const checkPermission = async () => {
    const userName = await AsyncStorage.getItem('user');
    return userName.includes('.');
};

const styles = StyleSheet.create({
    titleTable: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});