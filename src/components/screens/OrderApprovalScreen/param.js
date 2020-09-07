import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import Loading from '../../../common/loading';
import AppStyle from '../../../theme';
import DatePicker from '../../../../src/common/datePickerIOS';
import ModalSelectBukrs from '../../../common/selectSearch';

import { getListBukrs } from '../../../utils';
import { search } from '../../../containers/screens/OrderApprovalScreen';

const currentHouse = moment().format('DD/MM/YYYY');

export default function Param({ orders, updateOrders }) {
    // Get List Bukrs
    // console.log('red')
    const [listBukrs, setListBukrs] = React.useState([]);
    React.useEffect(() => {
        const getListParam = async () => {
            let listBukrs = await getListBukrs();
            await setListBukrs(listBukrs);
        };
        getListParam();
    }, [])
    // Mã công ty
    const [fromBukrs, onChangeFromBukrs] = React.useState('');
    const [toBukrs, onChangeToBukrs] = React.useState('');
    // Thời gian
    const [fromDate, setValueDateFrom] = React.useState(currentHouse);
    const [toDate, setValueDateTo] = React.useState(currentHouse);
    // Đơn hàng
    const [ebeln, onChangEbeln] = React.useState('');
    // Select Mã công ty
    const [isVisible, setModalVisible] = React.useState(false);
    const [mode, setMode] = React.useState('from');
    // Loading
    const [loading, updateLoading] = React.useState(false);
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
                    onChangeParam={mode === 'from' ? onChangeFromBukrs : onChangeToBukrs}
                /> : null
            }
            {/* Content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}>Từ</Text>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Mã công ty'
                            onChangeText={onChangeFromBukrs}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={fromBukrs}
                            style={AppStyle.StyleCommon.textInput}
                        />
                        <TouchableOpacity
                            style={AppStyle.StyleCommon.btnSearchHelp}
                            delayPressIn={0}
                            onPress={() => {
                                setMode('from');
                                setModalVisible(true);
                            }}
                        >
                            <Icon size={27} name={'text-box-search-outline'} color='#2196f3' />
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        modeDate='date'
                        setValueDate={setValueDateFrom}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}>Đến</Text>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Mã công ty'
                            onChangeText={onChangeToBukrs}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={toBukrs}
                            style={AppStyle.StyleCommon.textInput}
                        />
                        <TouchableOpacity
                            style={AppStyle.StyleCommon.btnSearchHelp}
                            delayPressIn={0}
                            onPress={() => {
                                setMode('to');
                                setModalVisible(true);
                            }}
                        >
                            <Icon size={27} name={'text-box-search-outline'} color='#2196f3' />
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        modeDate='date'
                        setValueDate={setValueDateTo}
                    />
                </View>

            </View>
            <Text style={AppStyle.StyleCommon.titleInput}>Đơn hàng</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...AppStyle.StyleCommon.textInputContainer, flex: 1 }}>
                    <TextInput
                        placeholder='Số đơn hàng'
                        onChangeText={onChangEbeln}
                        keyboardType={'number-pad'}
                        maxLength={10}
                        value={ebeln}
                        style={AppStyle.StyleCommon.textInput}
                    />
                </View>
                <View style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                }}>
                    <TouchableOpacity
                        style={{ ...AppStyle.StyleCommon.btnSearch, marginBottom: 5 }}
                        delayPressIn={0}
                        onPress={async () => {
                            Keyboard.dismiss();
                            updateLoading(true);
                            const resultSearch = await search(
                                {
                                    fromDate: fromDate,
                                    toDate: toDate,
                                    fromBukrs: fromBukrs,
                                    toBukrs: toBukrs,
                                    ebeln: ebeln
                                }
                            )
                            updateLoading(false);
                            updateOrders({
                                orders: [...resultSearch.resultOrder],
                                warning: resultSearch.warning,
                                isNewOrders: !orders.isNewOrders
                            });
                        }}
                    >
                        <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
};