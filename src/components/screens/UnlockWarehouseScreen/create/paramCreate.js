import * as React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppStyle from '../../../../theme';

import { createWarehouse } from '../../../../containers/screens/UnlockWarehouse';
import { checkParam } from './checkParamCreate';

export default function CreateWare({ bukrs, updateLoading, result, handleResult }) {
    // Period
    const [period, onChangePeriod] = React.useState('');
    // Fiscal Year
    const [year, onChangeYear] = React.useState('');
    // Radio box
    const [check, updateCheck] = React.useState({
        checkAndClosePeriod: true,
        checkPeriod: false,
        closePeriod: false
    })
    // Check box
    const [checkQuantity, setCheckQuantity] = React.useState(false);
    const [checkValue, setCheckValue] = React.useState(false);
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...AppStyle.StyleCommon.textInputContainer, flex: 6 }}>
                    <TextInput
                        placeholder='Kỳ'
                        maxLength={2}
                        keyboardType='numeric'
                        onChangeText={onChangePeriod}
                        value={period}
                        style={AppStyle.StyleCommon.textInput}
                    />
                </View>
                <View style={{ flex: 14 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...AppStyle.StyleCommon.textInputContainer, flex: 6 }}>
                    <TextInput
                        placeholder='Năm'
                        maxLength={4}
                        keyboardType='numeric'
                        onChangeText={onChangeYear}
                        value={year}
                        style={AppStyle.StyleCommon.textInput}
                    />
                </View>
                <View style={{ flex: 9 }} />
                <View style={{ flex: 5 }}>
                    <TouchableOpacity
                        style={{
                            ...AppStyle.StyleCommon.textInputContainer,
                            backgroundColor: '#4daa57',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 0
                        }}
                        delayPressIn={0}
                        onPress={async () => {
                            Keyboard.dismiss();
                            const reslutCheckParam = checkParam({
                                period: period,
                                year: year,
                                bukrs: bukrs
                            });
                            // console.log(reslutCheckParam);
                            if (reslutCheckParam.type == 'E') {
                                handleResult({
                                    ...result,
                                    warning: reslutCheckParam.warning
                                })
                            } else {
                                updateLoading(true);
                                const createResult = await createWarehouse({
                                    bukrs: bukrs,
                                    period: period,
                                    year: year,
                                    checkAndClosePeriod: check.checkAndClosePeriod,
                                    checkPeriod: check.checkPeriod,
                                    closePeriod: check.closePeriod,
                                    quantity: checkQuantity,
                                    value: checkValue
                                });
                                updateLoading(false);
                                if (createResult.type == 'W') {
                                    handleResult({
                                        ...result,
                                        warning: createResult.warning
                                    })
                                }
                                else if (createResult.type == 'E') {
                                    handleResult({
                                        ...result,
                                        warning: createResult.warning
                                    })
                                }
                                else {
                                    handleResult({
                                        ...result,
                                        warning: createResult.warning,
                                        createData: createResult.createResult,
                                        isVisible: true,
                                    })
                                }
                            }
                        }}
                    >
                        <AntDesign name='plus' size={26} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
            <CheckBox
                textStyle={{ marginLeft: 0, marginRight: 0, flex: 1 }}
                containerStyle={{ ...AppStyle.StyleCommon.checkBox, paddingVertical: 5, paddingLeft: 3 }}
                title='Check and then close period'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={check.checkAndClosePeriod}
                onPress={() => {
                    updateCheck({
                        checkAndClosePeriod: true,
                        checkPeriod: false,
                        closePeriod: false
                    })
                }}
            />
            <CheckBox
                textStyle={{ marginLeft: 0, marginRight: 0, flex: 1 }}
                containerStyle={{ ...AppStyle.StyleCommon.checkBox, paddingVertical: 5, paddingLeft: 3 }}
                title='Check period only'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={check.checkPeriod}
                onPress={() => {
                    updateCheck({
                        checkAndClosePeriod: false,
                        checkPeriod: true,
                        closePeriod: false
                    })
                }}
            />
            <CheckBox
                textStyle={{ marginLeft: 0, marginRight: 0, flex: 1 }}
                containerStyle={{ ...AppStyle.StyleCommon.checkBox, paddingVertical: 5, paddingLeft: 3 }}
                title='Close period only'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={check.closePeriod}
                onPress={() => {
                    updateCheck({
                        checkAndClosePeriod: false,
                        checkPeriod: false,
                        closePeriod: true
                    })
                }}
            />
            <CheckBox
                textStyle={{ marginLeft: 0, marginRight: 0, flex: 1 }}
                containerStyle={{ ...AppStyle.StyleCommon.checkBox, paddingVertical: 5, paddingLeft: 3 }}
                title='Allow Negative Quantities in Previous Period'
                checked={checkQuantity}
                onPress={() => setCheckQuantity(!checkQuantity)}
            />
            <CheckBox
                textStyle={{ marginLeft: 0, marginRight: 0, flex: 1 }}
                containerStyle={{ ...AppStyle.StyleCommon.checkBox, paddingVertical: 5, paddingLeft: 3 }}
                title='Allow Negative Values in Previous Period'
                checked={checkValue}
                onPress={() => setCheckValue(!checkValue)}
            />
        </View>
    );
};
