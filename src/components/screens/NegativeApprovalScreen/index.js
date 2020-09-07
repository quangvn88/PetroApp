import * as React from 'react';
import {
    View,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';

import Loading from '../../../common/loading';
import AppStyle from '../../../theme';
import Param from './param';
import Warning from '../../../common/warning';
import Result from './result';

import { handleState } from '../../../containers/screens/NegativeScreen';

export const NegativeApprovalScreen = () => {
    const [result, handleResult] = React.useState({
        data: {},
        warning: ''
    });
    const resultComponent = React.useMemo(() =>
        <Result
            result={result.data}
        />
        , [result.data]);
    const paramComponent = React.useMemo(() =>
        <Param
            result={result}
            handleResult={handleResult}
        />
        , [result.data]
    );
    const buttonComponent = React.useMemo(() =>
        <ButtonHandleApproval
            result={result}
            handleResult={handleResult}
        />
        , [result.data])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={AppStyle.StyleCommon.container}>
                {paramComponent}
                <Warning warning={result.warning} />
                {/* Result */}
                {resultComponent}
                {/* Button Approval */}
                {Object.keys(result.data).length === 0 && result.data.constructor === Object ? null :
                    buttonComponent
                }
            </View>
        </TouchableWithoutFeedback>

    );
};

const ButtonHandleApproval = ({ result, handleResult }) => {
    const [loading, updateLoading] = React.useState(false);
    const [isApproval, handleApproval] = React.useState(result.data.XMCNG === '');
    React.useEffect(()=>{
        handleApproval(result.data.XMCNG === '')
    },[result.data])
    return (
        <View>
            <Loading loading={loading} />
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                    delayPressIn={0}
                    style={{
                        ...styles.btnHandleApproval,
                        backgroundColor: isApproval ? '#269617' : '#eb3a23',

                    }}
                    onPress={async () => {
                        updateLoading(true);
                        const resultHandle = await handleState({
                            info: result.data
                        });
                        // console.log(resultHandle);
                        updateLoading(false);
                        if (resultHandle.type === 'S') {
                            setTimeout(() => {
                                Alert.alert(resultHandle.warning, `\nMặt hàng: ${result.data.MATNR} - ${result.data.MAKTX}
                                \nKho: ${result.data.WERKS} - ${result.data.NAME}`,
                                    [
                                        {
                                            text: "OK", onPress: () => {
                                                // console.log(result.data)
                                                handleResult({
                                                    warning: '',
                                                    data: { ...result.data, XMCNG: isApproval ? 'X' : '' }
                                                })
                                            }

                                            // handleApproval(!isApproval)
                                        }
                                    ],
                                    { cancelable: false }
                                )
                            }, 200)

                        } else if (resultHandle.type === 'W') {
                            handleResult({
                                ...result,
                                warning: resultHandle.warning
                            })
                        } else {
                            handleResult({
                                ...result,
                                warning: resultHandle.warning
                            })
                        }
                    }}
                >
                    {isApproval ?
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ ...styles.btnText, color: '#269617', opacity: 0 }}>Không phê duyệt</Text>
                            <Text style={{ ...styles.btnText, position: 'absolute' }}>Phê duyệt</Text>
                        </View> :
                        <Text style={styles.btnText}>Không phê duyệt</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnText: {
        lineHeight: 35,
        color: '#fff'
    },
    btnHandleApproval: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 5,
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent',
    }
});