import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {CheckBox} from 'react-native-elements';

import Loading from '../../../common/loading';
import AppStyle from '../../../theme';
import DatePicker from '../../../../src/common/datePickerIOS';

import ModalSelectBukrs from '../../../common/selectSearch';
import ModalSelectMatnr from './modals/selectMatnr';
import ModalSelectMultiBukrs from '../UnlockAccountingScreen/modals/modalSelectMultiBukrs';
import ModalSelectMultiMatnr from '../CreditApprovalScreen/modals/selectKunnr';

import {getListBukrs, getListMatnr} from '../../../utils';
import {search} from '../../../containers/screens/ReportScreen';

const currentDate = moment().format('DD/MM/YYYY');

export default function Param({result, handleResult, checked, setChecked}) {
  // Get List Bukrs, Matnr
  const [listParam, setListParam] = React.useState({
    listBukrs: [],
    listMatnr: [],
  });
  React.useEffect(() => {
    const getListParam = async () => {
      let listBukrs = await getListBukrs();
      let listMatnr = await getListMatnr();
      await setListParam({
        listBukrs: [...listBukrs],
        listMatnr: [...listMatnr],
      });
    };
    getListParam();
  }, []);
  // Mã công ty
  // Select Nhiều Bukrs
  const [fromBukrs, handleFromBukrs] = React.useState({
    isVisible: false,
    fromBukrs: [''],
    bukrsSelected: [],
  });
  // list selected Bukrs
  const onChangeFromBukrs = (text) => {
    let newFromBukrs = [...fromBukrs.fromBukrs];
    // Nếu không có phần tử và đang nhập khác trống thì push vào
    if (newFromBukrs.length === 0) {
      newFromBukrs.push('');
    }
    newFromBukrs[0] = text;
    handleFromBukrs({
      ...fromBukrs,
      fromBukrs: [...newFromBukrs],
    });
  };
  const [toBukrs, onChangeToBukrs] = React.useState('');
  // Modal Mã công ty
  const [isVisible, setModalVisible] = React.useState(false);
  const [mode, setMode] = React.useState('from');

  // Mã mặt hàng
  const [fromMatnr, handleFromMatnr] = React.useState({
    isVisible: false,
    param: [],
    paramSelected: [],
  });
  // Mã khách hàng
  const onChangeFromMatnr = (text) => {
    // console.log(matnr.matnr);
    let newFromMatnr = [...fromMatnr.param];
    // Nếu không có phần tử thì push vào
    if (newFromMatnr.length == 0) {
      newFromMatnr.push('');
    }
    newFromMatnr[0] = text;
    let str = newFromMatnr[0].replace(/\s/g, '');
    // Nếu phần tử đầu bị trống
    if (str == '') {
      newFromMatnr.shift();
    }
    handleFromMatnr({
      ...fromMatnr,
      param: [...newFromMatnr],
    });
  };
  // Select Nhiều Matnr
  const [toMatnr, onChangeToMatnr] = React.useState('');
  // Modal Mã mặt hàng
  const [isVisibleMatnr, setModalVisibleMatnr] = React.useState(false);
  const [modeMatnr, setModeMatnr] = React.useState('from');

  // Thời gian
  const [fromDate, setValueDateFrom] = React.useState(currentDate);
  const [toDate, setValueDateTo] = React.useState(currentDate);
  // Loading
  const [loading, updateLoading] = React.useState(false);
  return (
    <View>
      {/* Swipe Loading */}
      <Loading loading={loading} />
      {/* Modal select bukrs */}
      {isVisible ? (
        <ModalSelectBukrs
          placeholder={'Mã công ty...'}
          isVisible={isVisible}
          setModalVisible={setModalVisible}
          listData={listParam.listBukrs}
          onChangeParam={mode === 'from' ? onChangeFromBukrs : onChangeToBukrs}
        />
      ) : null}
      {/* Modal select multi kunnr */}
      {fromBukrs.isVisible ? (
        <ModalSelectMultiBukrs
          placeholder={'Mã công ty...'}
          isVisible={fromBukrs.isVisible}
          fromBukrs={fromBukrs}
          handleKunnrs={handleFromBukrs}
        />
      ) : null}
      {/* Modal select matnr */}
      {isVisibleMatnr ? (
        <ModalSelectMatnr
          placeholder={'Mã mặt hàng...'}
          isVisible={isVisibleMatnr}
          setModalVisible={setModalVisibleMatnr}
          listData={listParam.listMatnr}
          onChangeParam={
            modeMatnr === 'from' ? onChangeFromMatnr : onChangeToMatnr
          }
        />
      ) : null}
      {fromMatnr.isVisible ? (
        <ModalSelectMultiMatnr
          placeholder={'Mã mặt hàng...'}
          isVisible={fromMatnr.isVisible}
          param={fromMatnr}
          handleParam={handleFromMatnr}
        />
      ) : null}

      {/* Content */}
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 9}}>
          <Text style={AppStyle.StyleCommon.titleInput}>Từ</Text>
          <View style={AppStyle.StyleCommon.textInputContainer}>
            <TextInput
              placeholder="Mã công ty"
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
              }}>
              <Icon
                size={27}
                name={'text-box-search-outline'}
                color="#2196f3"
              />
            </TouchableOpacity>
          </View>
          <View style={AppStyle.StyleCommon.textInputContainer}>
            <TextInput
              multiline={false}
              numberOfLines={1}
              placeholder=" Mã Mặt hàng"
              onChangeText={onChangeFromMatnr}
              maxLength={7}
              keyboardType={'number-pad'}
              value={fromMatnr.param[0] ? fromMatnr.param[0] : ''}
              style={AppStyle.StyleCommon.textInput}
            />
            <TouchableOpacity
              style={AppStyle.StyleCommon.btnSearchHelp}
              delayPressIn={0}
              onPress={() => {
                setModeMatnr('from');
                setModalVisibleMatnr(true);
              }}>
              <Icon
                size={27}
                name={'text-box-search-outline'}
                color="#2196f3"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 9}}>
          <Text style={AppStyle.StyleCommon.titleInput}>Đến</Text>
          <View style={AppStyle.StyleCommon.textInputContainer}>
            <TextInput
              placeholder="Mã công ty"
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
              }}>
              <Icon
                size={27}
                name={'text-box-search-outline'}
                color="#2196f3"
              />
            </TouchableOpacity>
          </View>
          <View style={AppStyle.StyleCommon.textInputContainer}>
            <TextInput
              multiline={false}
              numberOfLines={1}
              placeholder=" Mã Mặt hàng"
              onChangeText={onChangeToMatnr}
              maxLength={7}
              keyboardType={'number-pad'}
              value={toMatnr}
              style={AppStyle.StyleCommon.textInput}
            />
            <TouchableOpacity
              style={AppStyle.StyleCommon.btnSearchHelp}
              delayPressIn={0}
              onPress={() => {
                setModeMatnr('to');
                setModalVisibleMatnr(true);
              }}>
              <Icon
                size={27}
                name={'text-box-search-outline'}
                color="#2196f3"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Chọn nhiều */}
        <View style={{flex: 2}}>
          {/* Mã công ty */}
          <Text style={{...AppStyle.StyleCommon.titleInput, color: '#fff'}}>
            T
          </Text>
          <View
            style={{
              margin: 5,
              padding: 5,
              paddingHorizontal: 0,
            }}>
            <TouchableOpacity
              style={{...AppStyle.StyleCommon.btnSearchHelp}}
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
                    bukrsSelected: [...fromBukrs.fromBukrs],
                  });
                }
              }}>
              <Icon
                size={27}
                name={'filter-plus-outline'}
                color={
                  fromBukrs.bukrsSelected.length < 2 ? '#178a29' : '#f58720'
                }
              />
            </TouchableOpacity>
          </View>
          {/* Mã mặt hàng */}

          <View
            style={{
              margin: 5,
              padding: 5,
              paddingHorizontal: 0,
            }}>
            <TouchableOpacity
              style={{...AppStyle.StyleCommon.btnSearchHelp}}
              delayPressIn={0}
              onPress={() => {
                handleResult({
                  ...result,
                  warning: '',
                });
                handleFromMatnr({
                  ...fromMatnr,
                  isVisible: true,
                  paramSelected: [...fromMatnr.param],
                });
              }}>
              {/* <View style={{ height: 28}}></View> */}
              <Icon
                size={27}
                name={'filter-plus-outline'}
                color={
                  fromMatnr.paramSelected.length < 2 ? '#178a29' : '#f58720'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Date */}
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <DatePicker modeDate="date" setValueDate={setValueDateFrom} />
        </View>
        <View style={{flex: 1}}>
          <DatePicker modeDate="date" setValueDate={setValueDateTo} />
        </View>
        {/* <View style={{ flex: 2 }} /> */}
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <CheckBox
          containerStyle={{
            ...AppStyle.StyleCommon.checkBox,
            flex: 1,
            alignItems: 'center',
          }}
          center
          title="Sản lượng"
          textStyle={{
            marginLeft: 0,
            marginRight: 0,
            flex: 1,
            color: checked.quantity ? '#007bff' : '#43484d',
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked.quantity}
          onPress={() => {
            setChecked({quantity: true, revenue: false});
          }}
        />
        <CheckBox
          textStyle={{
            marginLeft: 0,
            marginRight: 0,
            flex: 1,
            color: checked.revenue ? '#007bff' : '#43484d',
          }}
          containerStyle={{
            ...AppStyle.StyleCommon.checkBox,
            flex: 1,
            alignItems: 'center',
          }}
          center
          title="Doanh thu"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked.revenue}
          onPress={() => {
            setChecked({quantity: false, revenue: true});
            // showQuantity(false);
          }}
        />
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={AppStyle.StyleCommon.btnSearch}
            delayPressIn={0}
            onPress={async () => {
              Keyboard.dismiss();
              let str = fromBukrs.fromBukrs[0].replace(/\s/g, '');
              if (str === '') {
                handleResult({
                  ...result,
                  warning: 'Mời nhập một mã công ty',
                });
              } else {
                updateLoading(true);
                const searchResult = await search({
                  bukrs: fromBukrs.fromBukrs,
                  matnr: fromMatnr.param,
                  fromDate: fromDate,
                  toDate: toDate,
                  fromBukrs: fromBukrs.fromBukrs[0],
                  toBukrs: toBukrs,
                  fromItem: fromMatnr.param[0],
                  toItem: toMatnr,
                });
                updateLoading(false);
                handleResult({
                  ...result,
                  data: {...searchResult.resultReport},
                  warning: searchResult.warning,
                });
              }
            }}>
            <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
