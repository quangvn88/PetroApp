import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import Loading from '../../../common/loading';
import DatePicker from '../../../../src/common/datePickerIOS';
import AppStyle from '../../../theme';

import {createPo, search} from '../../../containers/screens/PoScreen';

// const currentDate = moment().format('DD/MM/YYYY');

const CurrentDate = () => {
  var date = new Date().getDate(); //Current Date
  date = date < 10 ? '0' + date : date;
  var month = new Date().getMonth() + 1; //Current Month
  month = month < 10 ? '0' + month : month;
  var year = new Date().getFullYear(); //Current Year
  return date + '/' + month + '/' + year;
};
const CurrentHours = () => {
  var hours = new Date().getHours();
  if (hours < 10) hours = '0' + hours;
  var minutes = new Date().getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  return hours + ':' + minutes + ':00';
};
// const currentTime = CurrentHours();

export default function ParamCreate({month, year, handleResult, result}) {
  const [date, setValueDate] = React.useState(CurrentDate());
  const [time, setValueTime] = React.useState(CurrentHours());
  const [period, onChangePeriod] = React.useState('');
  // Loading
  const [loading, updateLoading] = React.useState(false);
  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingBottom: 5,
        }}>
        <TouchableOpacity
          style={AppStyle.StyleCommon.btnSearch}
          delayPressIn={0}
          onPress={async () => {
            Keyboard.dismiss();
            if (year == '' || month == '')
              handleResult({
                ...result,
                warning: 'Chưa nhập đủ tham số',
              });
            else {
              updateLoading(true);
              const resultSearch = await search({
                year: year,
                month: month,
              });
              updateLoading(false);
              handleResult({
                data: resultSearch.info,
                warning: resultSearch.warning,
                isNewData: !result.isNewData,
              });
            }
          }}>
          <Text style={AppStyle.StyleCommon.btnText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        {/* <View style={{ flex: 2 }}> */}
        {/* <View style={AppStyle.StyleCommon.textInputContainer}>
                        <TextInput
                            placeholder='Kỳ'
                            onChangeText={onChangePeriod}
                            maxLength={2}
                            keyboardType={'number-pad'}
                            value={period}
                            style={AppStyle.StyleCommon.textInput}
                        />
                    </View> */}
        {/* </View> */}
        <View style={{flex: 3}}>
          <DatePicker modeDate="time" setValueDate={setValueTime} />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{
              ...AppStyle.StyleCommon.textInputContainer,
              backgroundColor: '#4daa57',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            delayPressIn={0}
            onPress={async () => {
              Keyboard.dismiss();
              const resultCheck = await checkParamAndPermission(period);
              if (!resultCheck.permission)
                handleResult({
                  ...result,
                  warning: resultCheck.warning,
                });
              else if (!resultCheck.isCorrect) {
                handleResult({
                  ...result,
                  warning: resultCheck.warning,
                });
              } else {
                updateLoading(true);
                const resultCreatePo = await createPo({
                  date: date,
                  time: time,
                  period: period,
                });
                updateLoading(false);
                if (resultCreatePo.type === 'S') {
                  setTimeout(() => {
                    Alert.alert(
                      'Tạo chu kỳ giá thành công',
                      resultCreatePo.warning,
                      [
                        {
                          text: 'OK',
                          onPress: () =>
                            handleResult({
                              ...result,
                              warning: '',
                            }),
                        },
                      ],
                      {cancelable: false},
                    );
                  }, 200);
                } else {
                  handleResult({
                    ...result,
                    warning: resultCreatePo.warning,
                  });
                }
              }
            }}>
            <AntDesign name="plus" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <DatePicker modeDate="date" setValueDate={setValueDate} />
        </View>
        <View style={{flex: 1}}>
          <View style={AppStyle.StyleCommon.textInputContainer}>
            <TextInput
              placeholder="Kỳ"
              onChangeText={onChangePeriod}
              maxLength={2}
              keyboardType={'number-pad'}
              value={period}
              style={AppStyle.StyleCommon.textInput}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const checkParamAndPermission = async (period) => {
  const userName = await AsyncStorage.getItem('user');
  // Check quyền
  if (userName.includes('.')) {
    return {
      permission: false,
      warning: 'Tài khoản không có quyền',
      type: 'E',
    };
  } else {
    // Check tham số
    const regex = /[^0-9]/g;
    if (period == '')
      return {
        permission: true,
        isCorrect: false,
        warning: 'Cần nhập kỳ để tạo mới',
      };
    else if (Number(period) <= 0)
      return {
        permission: true,
        isCorrect: false,
        warning: 'Mời nhập kỳ lớn hơn 0',
      };
    else if (period.match(regex))
      return {
        permission: true,
        isCorrect: false,
        warning: 'Mời nhập kỳ là một số, không chứa ký tự đặc biệt',
      };
    else if (Number(period) > 6)
      return {
        permission: true,
        isCorrect: false,
        warning: 'Mời nhập kỳ nhỏ hơn 6',
      };
    else {
      return {
        permission: true,
        isCorrect: true,
        warning: '',
      };
    }
  }
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'green',
    // padding: 5
  },
});
