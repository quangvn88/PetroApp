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
import ParamCreate from './paramCreate';
import ModalSelectBukrs from '../../../common/selectSearch';
import ModalSelectMultiBukrs from './modals/modalSelectMultiBukrs';

import { getListBukrs } from '../../../utils';
import { search } from '../../../containers/screens/UnlockAccounting';

export default function Param({ result, handleResult }) {
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
    // Select Nhiều Bukrs 
    const [fromBukrs, handleFromBukrs] = React.useState({
        isVisible: false,
        fromBukrs: [''],
        bukrsSelected: []
    });
    // list Bukrs
    const onChangeFromBukrs = (text) => {
        let newFromBukrs = [...fromBukrs.fromBukrs];
        // Nếu không có phần tử và đang nhập khác trống thì push vào
        if (newFromBukrs.length === 0) {
            newFromBukrs.push('');
        };
        newFromBukrs[0] = text;
        handleFromBukrs({
            ...fromBukrs,
            fromBukrs: [...newFromBukrs]
        })
    };
    const [toBukrs, onChangeToBukrs] = React.useState('');
    // Select Mã công ty Từ Đến
    const [isVisible, setModalVisible] = React.useState(false);
    const [mode, setMode] = React.useState('from');
    // Loading
    const [loading, updateLoading] = React.useState(false);
    return (
        <View>
            {/* Swipe Loading */}
            <Loading loading={loading} />
            {/* Modal select multi kunnr */}
            {fromBukrs.isVisible ?
                <ModalSelectMultiBukrs
                    placeholder={'Mã công ty...'}
                    isVisible={fromBukrs.isVisible}
                    fromBukrs={fromBukrs}
                    handleKunnrs={handleFromBukrs}
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
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 9 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}>Từ</Text>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Mã công ty'
                            onChangeText={onChangeFromBukrs}
                            maxLength={4}
                            keyboardType={'number-pad'}
                            value={fromBukrs.fromBukrs[0] ? fromBukrs.fromBukrs[0] : ''}
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
                </View>
                <View style={{ flex: 9 }}>
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
                </View>
                {/* Chọn nhiều */}
                <View style={{ flex: 2 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}></Text>
                    <View style={{ marginTop: 5, paddingTop: 5 }}>
                        <TouchableOpacity
                            style={{ ...AppStyle.StyleCommon.btnSearchHelp }}
                            delayPressIn={0}
                            onPress={() => {
                                let str = fromBukrs.fromBukrs[0].replace(/\s/g, '');
                                if (str === '') {
                                    handleResult({
                                        ...result,
                                        warning: 'Mời nhập một mã công ty',
                                    });
                                } else {
                                    //Clear warning and update bukrsSelected
                                    handleResult({
                                        ...result,
                                        warning: '',
                                    });
                                    handleFromBukrs({
                                        ...fromBukrs,
                                        isVisible: true,
                                        bukrsSelected: [...fromBukrs.fromBukrs]
                                    });
                                }
                            }}
                        >
                            <Icon
                                size={27}
                                name={'filter-plus-outline'}
                                color={fromBukrs.bukrsSelected.length < 2 ? '#178a29' : '#f58720'}
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
                        // Tìm kiếm
                        if (fromBukrs.fromBukrs[0] === '')
                            handleResult({
                                ...result,
                                warning: 'Chưa nhập mã công ty'
                            });
                        else {
                            updateLoading(true);
                            const searchResult = await search(
                                {
                                    fromBukrs: fromBukrs.fromBukrs[0],
                                    toBukrs: toBukrs,
                                    bukrs: fromBukrs.fromBukrs
                                }
                            );
                            updateLoading(false);
                            handleResult({
                                data: searchResult.resultAcounting,
                                warning: searchResult.warning
                            });
                        }
                    }}
                >
                    <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            {/* Param Create */}
            <ParamCreate
                bukrs={fromBukrs.fromBukrs}
                fromBukrs={fromBukrs.fromBukrs[0]}
                toBukrs={toBukrs}
                handleResult={handleResult}
                result={result}
            />
        </View>
    );
};  