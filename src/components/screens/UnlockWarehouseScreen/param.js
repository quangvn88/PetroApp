import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Loading from '../../../common/loading';
import AppStyle from '../../../theme';
import ModalSelectBukrs from '../../../common/selectSearch';
import ParamCreate from './create/paramCreate';

import { getListBukrs } from '../../../utils';
import { search } from '../../../containers/screens/UnlockWarehouse';

export default function Param({ result, handleResult }) {
    // Get List User
    const [listBukrs, setListBukrs] = React.useState([]);
    React.useEffect(() => {
        const getListParam = async () => {
            let listBukrs = await getListBukrs();
            await setListBukrs(listBukrs);
        };
        getListParam();
    }, [])
    // Tên tài khoản
    const [bukrs, onChangeBukrs] = React.useState('');
    // Select Tên tài khoản
    const [isVisible, setModalVisible] = React.useState(false);
    const [loading, updateLoading] = React.useState(false);
    const paramCreateComponent = React.useMemo(() =>
        <ParamCreate
            result={result}
            handleResult={handleResult}
            bukrs={bukrs}
            updateLoading={updateLoading}
        />

        , [bukrs, result]);

    return (
        <View>
            {/* Swipe Loading */}
            <Loading loading={loading} />
            {isVisible ?
                <ModalSelectBukrs
                    placeholder={'Mã công ty...'}
                    isVisible={isVisible}
                    setModalVisible={setModalVisible}
                    listData={listBukrs}
                    onChangeParam={onChangeBukrs}
                /> : null
            }
            {/* Content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Mã công ty'
                            onChangeText={onChangeBukrs}
                            maxLength={4}
                            keyboardType='numeric'
                            value={bukrs}
                            style={AppStyle.StyleCommon.textInput}
                        />
                        <TouchableOpacity
                            style={AppStyle.StyleCommon.btnSearchHelp}
                            delayPressIn={0}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <Icon size={27} name={'text-box-search-outline'} color='#2196f3' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', marginLeft: 5, justifyContent: 'flex-end', marginBottom: 5 }}>
                    <TouchableOpacity
                        style={AppStyle.StyleCommon.btnSearch}
                        delayPressIn={0}
                        onPress={async () => {
                            Keyboard.dismiss();
                            if (bukrs == '')
                                handleResult({
                                    ...result,
                                    warning: 'Chưa nhập mã công ty'
                                });
                            else {
                                updateLoading(true);
                                const searchResult = await search(
                                    {
                                        bukrs: bukrs
                                    }
                                )
                                updateLoading(false);
                                // console.log(searchResult);
                                handleResult({
                                    data: searchResult.resultWarehouse,
                                    warning: searchResult.warning
                                });
                            }
                        }}
                    >
                        <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Param Create */}
            {paramCreateComponent}
        </View >
    );
};