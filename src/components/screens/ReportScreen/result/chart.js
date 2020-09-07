import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import HighchartsReactNative from '../dist/src/HighchartsReactNative';
// import HighchartsReactNative from '../../../../../dist/src/OldVersion';

export const Chart = ({chartValue, isQuantity}) => {
  const name = isQuantity ? 'Sản lượng' : 'Doanh thu';
  const title = isQuantity ? 'sản lượng' : 'doanh thu';
  const unit = isQuantity ? 'L15' : 'VNĐ';
  const value = isQuantity
    ? [chartValue.ESUM_FKLMG_ND, chartValue.ESUM_FKLMG_TX]
    : [chartValue.ESUM_NETWR_ND, chartValue.ESUM_NETWR_TX];
  const chartOptions = {
    title: {
      text: 'Biểu đồ ' + title,
    },
    chart: {
      type: 'column',
    },
    series: [
      {
        showInLegend: false,
        name: name,
        data: value,
      },
    ],
    xAxis: {
      categories: ['Nội địa', 'Tái xuất'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: unit,
      },
    },
    credits: {
      enabled: false,
    },
  };
  const renderChart = React.useMemo(() => {
    return (
      <HighchartsReactNative
        styles={styles.container}
        options={chartOptions}
        useCDN={true}
        useSSL={true}
      />
    );
  }, [isQuantity, chartValue]);
  return renderChart;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
