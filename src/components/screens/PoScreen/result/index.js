import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import Title from './titleTable';
import Content from './content';

export default function Result({result, handleResult}) {
  return (
    <View style={styles.container}>
      <Title />
      <Content result={result} handleResult={handleResult} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe6e9',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
