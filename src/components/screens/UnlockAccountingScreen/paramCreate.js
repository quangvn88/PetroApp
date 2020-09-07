import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Alert
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppStyle from '../../../theme';
import ModalSelectType from './modals/modalSelectType';
import Loading from '../../../common/loading';

import { createAccounting } from '../../../containers/screens/UnlockAccounting';
import { checkParam } from './functionCheckParam';

export default function ParamCreate({ bukrs, fromBukrs, toBukrs, result, handleResult }) {
    const [type, onChangeType] = React.useState({
        type: '',
        isVisible: false
    });

    const [fromPeriod, onChangeFromPeriod] = React.useState('');
    const [toPeriod, onChangeToPeriod] = React.useState('');

    const [fromYear, onChangeFromYear] = React.useState('');
    const [toYear, onChangeToYear] = React.useState('');
    // Select Type
    // const [isVisible, setModalVisible] = React.useState({

    // });
    const [loading, updateLoading] = React.useState(false);
    return (
        <View>
            {/* Swipe Loading */}
            <Loading loading={loading} />
            {type.isVisible ?
                <ModalSelectType
                    type={type}
                    onChangeType={onChangeType}
                /> : null
            }
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 9 }}>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Từ Năm'
                            onChangeText={onChangeFromYear}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={fromYear}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View>
                </View>
                <View style={{ flex: 6 }}>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Từ Kỳ'
                            onChangeText={onChangeFromPeriod}
                            maxLength={2}
                            keyboardType={'number-pad'}
                            value={fromPeriod}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View>
                </View>
                <View style={{ flex: 5 }}>
                    <TouchableOpacity
                        style={{
                            ...AppStyle.StyleCommon.textInputContainer,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        delayPressIn={0}
                        onPress={async () => {
                            Keyboard.dismiss();
                            onChangeType({
                                ...type,
                                isVisible: true
                            });
                        }}
                    >
                        <Text style={{
                            // ...AppStyle.StyleCommon.textInput,
                            textAlign: 'center',
                            paddingLeft: 0,
                            color: type.type === '' ? '#878f92' : 'black'
                        }}>{type.type === '.' ? 'Tất cả' : type.type === '' ? 'Type' : type.type}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 9 }}>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Đến Năm'
                            onChangeText={onChangeToYear}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={toYear}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View>
                </View>
                <View style={{ flex: 6 }}>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Đến Kỳ'
                            onChangeText={onChangeToPeriod}
                            maxLength={2}
                            keyboardType={'number-pad'}
                            value={toPeriod}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View>
                </View>
                <View style={{ flex: 5 }}>
                    <TouchableOpacity
                        style={{
                            ...AppStyle.StyleCommon.textInputContainer,
                            backgroundColor: '#4daa57',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        delayPressIn={0}
                        onPress={async () => {
                            Keyboard.dismiss();
                            const check = checkParam({
                                type: type.type,
                                fromBukrs: fromBukrs,
                                fromPeriod: fromPeriod,
                                toPeriod: toPeriod,
                                fromYear: fromYear,
                                toYear: toYear
                            });
                            if (check.type === 'E')
                                handleResult({
                                    ...result,
                                    warning: check.warning
                                })
                            else {
                                updateLoading(true);
                                const createResult = await createAccounting({
                                    type: type.type,
                                    bukrs: bukrs,
                                    fromBukrs: fromBukrs,
                                    toBukrs: toBukrs,
                                    fromPeriod: fromPeriod,
                                    toPeriod: toPeriod,
                                    fromYear: fromYear,
                                    toYear: toYear
                                });
                                updateLoading(false);
                                if (createResult.type === 'S') {
                                    setTimeout(() => {
                                        Alert.alert('Mở kỳ kế toán thành công',
                                            createResult.warning,
                                            [
                                                {
                                                    text: "OK", onPress: () =>
                                                        handleResult({
                                                            ...result,
                                                            warning: ''
                                                        })
                                                }
                                            ],
                                            { cancelable: false }
                                        );
                                    }, 200);
                                } else {
                                    handleResult({
                                        ...result,
                                        warning: createResult.warning
                                    })
                                }
                            }
                        }}
                    >
                        <AntDesign name='plus' size={25} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
};