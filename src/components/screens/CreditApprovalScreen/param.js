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
import ModalSelectKunnr from './modals/selectKunnr';
import ModalSelectBukrs from '../../../common/selectSearch';

import { getListBukrs } from '../../../utils';
import { search } from '../../../containers/screens/CreditApprovalScreen';

const currentDate = moment().format('DD/MM/YYYY');

export default function Param({ updateCredits, credits }) {
    // Select Mã công ty
    const [isVisible, setModalVisible] = React.useState(false);
    const [mode, setMode] = React.useState('from');
    // Loading
    const [loading, updateLoading] = React.useState(false);
    // Get List Bukrs
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
    const [fromDate, setValueDateFrom] = React.useState(currentDate);
    const [toDate, setValueDateTo] = React.useState(currentDate);
    //Lệnh xuất
    const [vbeln, onChangVbeln] = React.useState('');
    // Select Mã khác hàng
    const [kunnrs, handleKunnrs] = React.useState({
        isVisible: false,
        param: [],
        paramSelected: []
    });
    // Mã khách hàng
    const onChangeKunnr = (text) => {
        // console.log(kunnrs.kunnrs);
        let newKunnrs = [...kunnrs.param];
        // Nếu không có phần tử thì push vào
        if (newKunnrs.length == 0) {
            newKunnrs.push('');
        };
        newKunnrs[0] = text;
        let str = newKunnrs[0].replace(/\s/g, '');
        // Nếu phần tử đầu bị trống
        if (str == '') {
            newKunnrs.shift();
        }
        handleKunnrs({
            ...kunnrs,
            param: [...newKunnrs]
        })
    };
    return (
        <View>
            {/* Swipe Loading */}
            <Loading loading={loading} />
            {/* Modal select multi kunnr */}
            {kunnrs.isVisible ?
                <ModalSelectKunnr
                    placeholder={'Mã khách hàng...'}
                    isVisible={kunnrs.isVisible}
                    param={kunnrs}
                    handleParam={handleKunnrs}
                /> : null
            }
            {/* Modal select bukrs */}
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
                    <Text style={AppStyle.StyleCommon.titleInput}>Lệnh xuất</Text>
                    <View style={{ ...AppStyle.StyleCommon.textInputContainer, flex: 1 }}>
                        <TextInput
                            placeholder='Số lệnh xuất'
                            onChangeText={onChangVbeln}
                            keyboardType={'number-pad'}
                            maxLength={10}
                            value={vbeln}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View>
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
                    <Text style={AppStyle.StyleCommon.titleInput}>Mã khách hàng</Text>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Mã khách'
                            maxLength={6}
                            onChangeText={(text) => onChangeKunnr(text)}
                            value={kunnrs.param[0] ? kunnrs.param[0] : ''}
                            style={AppStyle.StyleCommon.textInput}
                        />
                        <TouchableOpacity
                            style={AppStyle.StyleCommon.btnSearchHelp}
                            delayPressIn={0}
                            onPress={() => {
                                updateCredits({
                                    ...credits,
                                    warning: '',
                                });
                                handleKunnrs({
                                    ...kunnrs,
                                    isVisible: true,
                                    paramSelected: [...kunnrs.param]
                                });
                            }}
                        >
                            <Icon
                                size={27}
                                name={'filter-plus-outline'}
                                color={kunnrs.paramSelected.length < 2 ? '#178a29' : '#f58720'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                    style={AppStyle.StyleCommon.btnSearch}
                    delayPressIn={0}
                    onPress={async () => {
                        Keyboard.dismiss();
                        updateLoading(true);
                        const result = await search(
                            {
                                i_skunnr: kunnrs.param[0],
                                i_mkunnr: kunnrs.param,
                                fromDate: fromDate,
                                toDate: toDate,
                                fromBukrs: fromBukrs,
                                toBukrs: toBukrs,
                                vbeln: vbeln
                            }
                        )
                        updateCredits({
                            warning: result.warning,
                            credits: result.resultCredit,
                            newResult: !credits.newResult
                        })
                        updateLoading(false);
                    }}
                >
                    <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};