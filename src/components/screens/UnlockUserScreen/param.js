import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Loading from '../../../common/loading';
import AppStyle from '../../../theme';
import ModalSelectUser from './selectUserName';

import { getListUser } from '../../../utils';
import { search } from '../../../containers/screens/UnlockUser';

export default function Param({ updateUserDetail, userDetail }) {
    // Get List User
    const [listUser, setListUser] = React.useState([]);
    React.useEffect(() => {
        const getListParam = async () => {
            let listUser = await getListUser();
            await setListUser(listUser);
        };
        getListParam();
    }, [])
    // Tên tài khoản
    const [username, onChangeUserName] = React.useState('');
    // Select Tên tài khoản
    const [isVisible, setModalVisible] = React.useState(false);
    // Loading
    const [loading, updateLoading] = React.useState(false);
    return (
        <View>
            {/* Swipe Loading */}
            <Loading loading={loading} />
            {isVisible ?
                <ModalSelectUser
                    placeholder={'Tên tài khoản...'}
                    isVisible={isVisible}
                    setModalVisible={setModalVisible}
                    listData={listUser}
                    onChangeParam={onChangeUserName}
                /> : null
            }
            {/* Content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ ...AppStyle.StyleCommon.titleInput, marginBottom: -8, alignItems: 'flex-start' }}>
                        <MaterialCommunityIcons name='card-account-details-outline' size={35} color='#f07822' />
                    </View>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Tên tài khoản'
                            onChangeText={onChangeUserName}
                            value={username}
                            style={AppStyle.StyleCommon.textInput}
                        />
                        <TouchableOpacity
                            style={AppStyle.StyleCommon.btnSearchHelp}
                            delayPressIn={0}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <MaterialCommunityIcons size={27} name={'text-box-search-outline'} color='#2196f3' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', marginLeft: 5, justifyContent: 'flex-end', marginBottom: 5 }}>
                    <TouchableOpacity
                        style={AppStyle.StyleCommon.btnSearch}
                        delayPressIn={0}
                        onPress={async () => {
                            Keyboard.dismiss();
                            if (username == '')
                                updateUserDetail({
                                    ...userDetail,
                                    warning: 'Chưa nhập tên tài khoản'
                                });
                            else {
                                updateLoading(true);
                                const result = await search(
                                    {
                                        username: username
                                    }
                                );
                                updateLoading(false);
                                updateUserDetail({
                                    userDetail: result.userDetail,
                                    warning: result.warning
                                });

                            }
                        }}
                    >
                        <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
};