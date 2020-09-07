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


export const PoScreen = () => {
    const [result, handleResult] = React.useState({
        data: [],
        warning: '',
        isNewData: false
    });
    // use memmo reuslt
    const resultComponent = React.useMemo(() =>
        <Result
            result={result}
            handleResult={handleResult}
        />
        , [result.data]
    );
    // use memo param
    const paramComponent = React.useMemo(() =>
        <Param
            result={result}
            handleResult={handleResult}
        />
        , [result]
    );
    return (
        <View style={AppStyle.StyleCommon.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    {paramComponent}
                    <Warning warning={result.warning} />
                </View>
            </TouchableWithoutFeedback>
            {result.data.length != 0 ? resultComponent : null}
        </View>
    );
};