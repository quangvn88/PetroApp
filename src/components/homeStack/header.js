import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {CurrentDate} from '../../utils';
const screenHeight = Dimensions.get('window').height;

export default function Header({openDrawer, userDetail}) {
  const currentTime = CurrentDate();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerMenu}>
          <TouchableOpacity
            style={styles.menuBtn}
            // activeOpacity={0.5}
            delayPressIn={0}
            underlayColor="#a1a6a6"
            onPress={() => {
              openDrawer.openDrawer();
            }}>
            <MaterialCommunityIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.header}>Trang chủ</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textStyle}>{currentTime}</Text>
            <Text style={styles.textStyle}>{userDetail.USERNAME}</Text>
            {/* <Text style={styles.textStyle}>Hello</Text> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: screenHeight / 6,
    marginBottom: 10,
  },
  textStyle: {
    color: '#f29f38',
    fontStyle: 'italic',
    textAlign: 'right',
  },
  containerMenu: {
    alignItems: 'flex-start',
  },
  infoContainer: {
    marginRight: 10,
  },
  menuBtn: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#4169E1',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
