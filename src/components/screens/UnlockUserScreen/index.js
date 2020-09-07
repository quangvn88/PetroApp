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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AppStyle from '../../../theme';
import Param from './param';
import Warning from '../../../common/warning';
import Result from './result';
import Loading from '../../../common/loading';

import { unlock } from '../../../containers/screens/UnlockUser';

export const UnlockUserScreen = () => {
    // Kết quả tìm kiếm
    const [userDetail, updateUserDetail] = React.useState({
        userDetail: {},
        warning: ''
    });
    //Use memo Result
    const result = React.useMemo(() =>
        <Result
            userDetail={userDetail.userDetail}
        />
        , [userDetail.userDetail]);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={AppStyle.StyleCommon.container}>
                <Param
                    userDetail={userDetail}
                    updateUserDetail={updateUserDetail}
                />
                <Warning warning={userDetail.warning} />
                {/* Result */}
                <View style={{ flex: 1 }}>
                    {result}
                    <ButtonUnlock
                        updateUserDetail={updateUserDetail}
                        userDetail={userDetail}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

};

const ButtonUnlock = ({ userDetail, updateUserDetail }) => {
    const username = userDetail.userDetail.USERNAME;
    //Loading
    const [loading, updateLoading] = React.useState(false);
    // Unlock thanh cong
    const updateStatus = () => {
        let newUserDetail = { ...userDetail.userDetail }
        newUserDetail.UFLAG = 0;
        updateUserDetail({
            userDetail: { ...newUserDetail },
            warning: ''
        })
    }
    return (
        <>
            <Loading loading={loading} />
            {userDetail.userDetail.UFLAG != 0 && userDetail.userDetail.UFLAG !== undefined ? (
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#4f772d',
                            flexDirection: 'row',
                            marginRight: 5,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: 'transparent',
                        }}
                        onPress={async () => {
                            updateLoading(true);
                            const result = await unlock({
                                username: username
                            });
                            updateLoading(false);
                            if (result.type === 'S') {
                                // Cập nhật trạng thái
                                //Thông báo
                                setTimeout(() => {
                                    Alert.alert('Thành công',
                                        'Mở khóa thành công: ' + userDetail.USERNAME,
                                        [
                                            {
                                                text: "OK", onPress: () =>
                                                    updateStatus()
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                }, 200)
                            } else {
                                updateUserDetail({
                                    ...userDetail,
                                    warning: result.warning
                                })
                            }
                        }}
                    >
                        <View style={{ justifyContent: 'center' }}>
                            <FontAwesome name="unlock" size={26.5} color='yellow' />
                        </View>
                        <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 10 }}>Mở khóa</Text>
                    </TouchableOpacity>
                </View>
            ) : null
            }
        </>
    );
};

const styles = StyleSheet.create({

});