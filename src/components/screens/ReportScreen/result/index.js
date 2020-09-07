import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Chart} from './chart';
import {Sum} from './sum';
import {Detail} from './detail';

export default function Result({data, checked, layoutHtml}) {
  // Show biểu đồ hay chi tiết
  const [showChart, handleShow] = React.useState(false);
  const chartValue = {
    ESUM_FKLMG_ND: data.ESUM_FKLMG_ND,
    ESUM_FKLMG_TX: data.ESUM_FKLMG_TX,
    ESUM_NETWR_ND: data.ESUM_NETWR_ND,
    ESUM_NETWR_TX: data.ESUM_NETWR_TX,
  };
  const listValue = data.DATA;

  return (
    <View style={{flex: 1}}>
      <ButtonShow handleShow={handleShow} showChart={showChart} />

      {!showChart ? (
        <View style={styles.container}>
          <Sum isQuantity={checked.quantity} chartValue={chartValue} />
          <Detail isQuantity={checked.quantity} listValue={listValue} />
        </View>
      ) : (
        // <Chart isQuantity={checked.quantity} chartValue={chartValue} />
        <Chart
          isQuantity={checked.quantity}
          chartValue={chartValue}
          layoutHtml={layoutHtml}
        />
      )}
    </View>
  );
}

const ButtonShow = ({handleShow, showChart}) => {
  return (
    <View style={{alignItems: 'flex-end'}}>
      <TouchableOpacity
        delayPressIn={0}
        style={{
          ...styles.btnHandleApproval,
          backgroundColor: '#269617',
        }}
        onPress={() => {
          handleShow(!showChart);
        }}>
        {/* <View style={{ justifyContent: 'center', justifyContent: 'center' }}> */}
        <Text style={{...styles.btnText, color: '#269617', opacity: 0}}>
          Tìm kiếm
        </Text>
        <Text style={{...styles.btnText, position: 'absolute'}}>
          {showChart ? 'Chi tiết' : 'Biểu đồ'}
        </Text>
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe6e9',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  btnText: {
    lineHeight: 28,
    color: '#fff',
  },
  btnHandleApproval: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'transparent',
  },
});
