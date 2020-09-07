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
import ModalCreateResult from './create/modalCreateResult';

export const UnlockWarehouseScreen = () => {
    const [result, handleResult] = React.useState({
        data: [],
        warning: '',
        isVisible: false,
        createData: [],
    });
    const resultComponent = React.useMemo(() =>
        <Result
            data={result.data}
        />
        , [result.data]);
    const paramComponent = React.useMemo(() =>
        <Param
            result={result}
            handleResult={handleResult}
        />
        , [result.data]
    )
    return (
        <View style={AppStyle.StyleCommon.container}>
            {result.isVisible ?
                <ModalCreateResult
                    result={result}
                    handleResult={handleResult}
                /> : null}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <>
                    {paramComponent}
                    <Warning warning={result.warning} />
                </>
            </TouchableWithoutFeedback>
            {/* Result */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {result.data.length != 0 ? resultComponent : <></>}
            </TouchableWithoutFeedback>
        </View>
    );
};
