import * as React from 'react';
import {
    View,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import AppStyle from '../../../theme';
import Param from './param';
import Warning from '../../../common/warning';
import Result from './result';

export const UnlockAccountingScreen = () => {
    const [result, handleResult] = React.useState({
        data: [],
        warning: ''
    });
    // use memo result
    const resultComponent = React.useMemo(() =>
        <Result
            result={result.data}
        />
        , [result.data])
    // param
    const paramComponent = React.useMemo(() =>
        <Param
            result={result}
            handleResult={handleResult}
        />
        , [result])
    return (
        <View style={AppStyle.StyleCommon.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    {paramComponent}
                    <Warning warning={result.warning} />
                </View>
            </TouchableWithoutFeedback>
            {result.data.length !== 0 ? resultComponent :
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
            }
        </View>
    );

};