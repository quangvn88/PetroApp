import * as React from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';

import AppStyle from '../../../theme';
import Param from './param';
import Warning from '../../../common/warning';
import Result from './result';
import Loading from '../../../common/loading';

export const ReportScreen = () => {
  const [result, handleResult] = React.useState({
    data: {},
    warning: '',
  });
  // Loại biểu đồ Sản lượng - Doanh thu
  const [checked, setChecked] = React.useState({
    quantity: true,
    revenue: false,
  });
  const paramComponent = React.useMemo(
    () => (
      <Param
        checked={checked}
        setChecked={setChecked}
        result={result}
        handleResult={handleResult}
      />
    ),
    [result.data, checked],
  );
  return (
    <View style={AppStyle.StyleCommon.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          {paramComponent}
          <Warning warning={result.warning} />
        </>
      </TouchableWithoutFeedback>
      {Object.keys(result.data).length === 0 &&
      result.data.constructor === Object ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1}}></View>
        </TouchableWithoutFeedback>
      ) : (
        <Result checked={checked} data={result.data} />
      )}
    </View>
  );
};
