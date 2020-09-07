import * as React from 'react';
import {
    View,
    TextInput,
} from 'react-native';

import ParamCreate from './paramCreate';
import AppStyle from '../../../theme';

export default function Param({ handleResult, result }) {
    // Tháng
    const [month, onChangeMonth] = React.useState('');
    // Năm
    const [year, onChangeYear] = React.useState('');
    return (
        <View>
            {/* Content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Tháng'
                            onChangeText={onChangeMonth}
                            keyboardType={'number-pad'}
                            maxLength={2}
                            value={month}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View>
                </View>
                <View style={{ flex: 3 }}>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Năm'
                            onChangeText={onChangeYear}
                            keyboardType={'number-pad'}
                            maxLength={4}
                            value={year}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View>
                </View>
            </View>
            <ParamCreate
                year={year}
                month={month}
                handleResult={handleResult}
                result={result}
            />
        </View >
    );
};