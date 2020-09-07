import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ModalReasonRelease from './modals/reasonRelease';
import AppStyle from '../../../theme';
import Param from './param';
import Warning from '../../../common/warning';
import Result from './result';

export const CreditApprovalScreen = () => {
    const [credits, updateCredits] = React.useState(
        {
            credits: [],
            warning: '',
            newResult: false
        }
    );
    // Reason Release
    const [release, handleRelease] = React.useState({
        isVisible: false,
        listRelease: [],
    });
    // useMemo Result
    const result = React.useMemo(() =>
        <Result
            credits={credits}
            updateCredits={updateCredits}
        />
        , [credits.newResult, credits.credits]);
    // Param
    const paramComponent = React.useMemo(() =>
        <Param
            credits={credits}
            updateCredits={updateCredits}
        />
        , [credits.newResult]
    )
    return (
        <View style={AppStyle.StyleCommon.container}>
            {/* Tham số */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    {paramComponent}
                    {/* Thông báo lỗi */}
                    {credits.warning === '' ?
                        <Warning warning={''} /> :
                        <Warning warning={credits.warning} />
                    }
                </View>
            </TouchableWithoutFeedback>
            {/* Xử lý Kết quả */}
            {
                credits.credits.length !== 0 ?
                    <View style={{ flex: 1 }}>
                        {release.isVisible ?
                            <ModalReasonRelease
                                credits={credits}
                                updateCredits={updateCredits}
                                release={release}
                                handleRelease={handleRelease}
                            />
                            : null}
                        <ButtonRelease
                            credits={credits}
                            updateCredits={updateCredits}
                            release={release}
                            handleRelease={handleRelease}
                        />
                        {/* Kết quả */}
                        {result}
                    </View> :
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>
            }
        </View >
    );
};

const ButtonRelease = ({ release, handleRelease, updateCredits, credits }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ alignItems: 'flex-end', paddingBottom: 10 }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    delayPressIn={0.1}
                    onPress={async () => {
                        //Release credit
                        let listRelease = credits.credits.filter((e) => {
                            return e.checked === true;
                        }).map(e => e.VBELN);
                        if (listRelease.length !== 0) {
                            handleRelease({ ...release, listRelease: [...listRelease], isVisible: true })
                        } else {
                            updateCredits({ ...credits, warning: 'Bạn chưa chọn lệnh xuất nào để phê duyệt' })
                        }
                    }}
                >
                    <View style={AppStyle.StyleCommon.btnRelease}>
                        <Icon name='flag' color='white' size={18} />
                        <Text style={{ color: 'white', marginLeft: 5 }}>Release</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};