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
import ModalSelectParam from '../../../common/selectSearch';

import { getListMatnr, getListPlant } from '../../../utils';
import { search } from '../../../containers/screens/NegativeScreen';

export default function Param({ result, handleResult }) {
    // List param select
    const [listParam, setListParam] = React.useState({
        listMatnr: [],
        listPlant: []
    });
    React.useEffect(() => {
        const getListParam = async () => {
            const listMatnr = await getListMatnr();
            const listPlant = await getListPlant();
            setListParam({
                listMatnr: listMatnr,
                listPlant: listPlant
            });
        };
        getListParam();
    }, []);
    // Modal search
    const [isVisible, setModalVisible] = React.useState(false);
    const [mode, setMode] = React.useState('matnr');//matnr or plant
    // Mã mặt hàng
    const [matnr, updateMatnr] = React.useState({
        code: '',
        text: ''
    });
    const onChangeMatnr = (text) => {
        updateMatnr({ text: '', code: text })
    };
    // Mã kho
    const [plant, updatePlant] = React.useState({
        code: '',
        text: ''
    });
    const onChangePlant = (text) => {
        updatePlant({ text: '', code: text })
    };
    // Loading
    const [loading, updateLoading] = React.useState(false);
    return (
        <View>
            {/* Swipe Loading */}
            <Loading loading={loading} />
            {/* Modal select matnr,plant */}
            {isVisible ?
                <ModalSelectParam
                    placeholder={mode === 'matnr' ? 'Mã mặt hàng...' : 'Mã kho...'}
                    isVisible={isVisible}
                    setModalVisible={setModalVisible}
                    listData={mode === 'matnr' ? listParam.listMatnr : listParam.listPlant}
                    onChangeParam={mode === 'matnr' ? updateMatnr : updatePlant}
                /> : null
            }
            {/* Content */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}>Mặt hàng</Text>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Mã mặt hàng'
                            onChangeText={onChangeMatnr}
                            maxLength={7}
                            value={matnr.code}
                            style={AppStyle.StyleCommon.textInput}
                        />
                        <TouchableOpacity
                            style={AppStyle.StyleCommon.btnSearchHelp}
                            delayPressIn={0}
                            onPress={() => {
                                setMode('matnr');
                                setModalVisible(true);
                            }}
                        >
                            <Icon size={27} name={'text-box-search-outline'} color='#2196f3' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}>Kho</Text>
                    <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Mã kho'
                            onChangeText={onChangePlant}
                            maxLength={4}
                            value={plant.code}
                            style={AppStyle.StyleCommon.textInput}
                        />
                        <TouchableOpacity
                            style={AppStyle.StyleCommon.btnSearchHelp}
                            delayPressIn={0}
                            onPress={() => {
                                setMode('plant');
                                setModalVisible(true);
                            }}
                        >
                            <Icon size={27} name={'text-box-search-outline'} color='#2196f3' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Text */}
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}>{matnr.text}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={AppStyle.StyleCommon.titleInput}>{plant.text}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                    style={AppStyle.StyleCommon.btnSearch}
                    delayPressIn={0}
                    onPress={async () => {
                        Keyboard.dismiss();
                        // Check param
                        if (matnr.code === '' && plant.code === '') {
                            handleResult({
                                ...result,
                                warning: 'Chưa nhập mã mặt hàng, mã kho'
                            })
                        }
                        else if (matnr.code === '') {
                            handleResult({
                                ...result,
                                warning: 'Chưa nhập mã mặt hàng'
                            })
                        }
                        else if (plant.code === '') {
                            handleResult({
                                ...result,
                                warning: 'Chưa nhập mã kho'
                            })
                        }
                        else {
                            updateLoading(true);
                            const seachResult = await search(
                                {
                                    matnr: matnr.code,
                                    plant: plant.code
                                }
                            );
                            updateLoading(false);
                            handleResult({
                                data: { ...seachResult.info },
                                warning: seachResult.warning
                            })
                        }
                    }}
                >
                    <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};