import * as React from 'react';
import {
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from './utils';
import {BackgroundCurve} from './BackgroundCurve';
import {checkLogin} from '../../containers/auth';
import Loading from '../../common/loading';
import Warning from '../../common/warning';

export function SignInScreen() {
  const [username, onChangeUser] = React.useState('');
  const [password, onChangePass] = React.useState('');
  const [state, updateState] = React.useState({
    warning: '',
    loading: false,
  });
  // const [warning, updateWarning] = React.useState('');
  // const [isLoading, showLoading] = React.useState(false);
  const [hidePass, showPass] = React.useState(true);

  const passwordRef = React.useRef();

  const {signIn} = React.useContext(AuthContext);

  const warningComponent = React.useMemo(
    () => <Warning warning={state.warning} />,
    [state.warning],
  );
  const header = React.useMemo(() => {
    return (
      <SafeAreaView>
        <View style={{height: 200}}>
          <BackgroundCurve
            style={styles.svg}
            svg={{
              position: 'absolute',
              top: 280,
            }}
            viewAbove={{
              backgroundColor: '#FB7200',
              height: 320,
            }}
            colorSvg={'#FB7200'}
          />
          <BackgroundCurve
            style={styles.svg}
            svg={{
              position: 'absolute',
              top: 275,
            }}
            viewAbove={{
              backgroundColor: '#4169E1',
              height: 315,
            }}
            colorSvg={'#4169E1'}
          />
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/logo.png')}></Image>
            </View>
            <View>
              <Text style={styles.textHeader}>PETROLIMEX</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }, []);
  const param = React.useMemo(() => {
    return (
      <View style={{paddingHorizontal: 40}}>
        <View>
          <MaterialCommunityIcons
            name="account-outline"
            color={'#756c6c'}
            size={28}
            style={styles.inputIcon}
          />
          <TextInput
            maxLength={30}
            returnKeyType="next"
            style={styles.input}
            placeholder="Tên tài khoản"
            onChangeText={onChangeUser}
            value={username}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
            }}
            onPress={() => {
              onChangeUser('');
            }}>
            <Feather name={'x-circle'} color={'#756c6c'} size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <MaterialCommunityIcons
            name="lock-outline"
            color={'#756c6c'}
            size={28}
            style={styles.inputIcon}
          />
          <TextInput
            maxLength={30}
            ref={passwordRef}
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={hidePass}
            onChangeText={onChangePass}
            value={password}
            autoCapitalize="none"
          />
          {password != '' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 20,
                right: 65,
              }}
              onPress={() => {
                onChangePass('');
              }}>
              <Feather name={'x-circle'} color={'#756c6c'} size={20} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 15,
              right: 15,
            }}
            onPress={() => {
              showPass(!hidePass);
            }}>
            <MaterialCommunityIcons
              name={hidePass ? 'eye-outline' : 'eye-off-outline'}
              color={'#756c6c'}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [username, password, hidePass]);
  return (
    <View style={{backgroundColor: 'rgb(255,255,255)', flex: 1}}>
      <Loading loading={state.loading} />
      <StatusBar backgroundColor="#4169E1" barStyle="light-content" />
      {header}
      {param}
      {state.warning !== '' ? warningComponent : null}
      <View style={{paddingHorizontal: 40}}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          activeOpacity={0.3}
          onPress={async () => {
            if (username == '')
              updateState({
                ...state,
                warning: 'Vui lòng nhập tài khoản',
              });
            else if (password == '')
              updateState({
                ...state,
                warning: 'Vui lòng nhập mật khẩu',
              });
            else {
              updateState({
                loading: true,
                warning: '',
              });
              let result = await checkLogin({
                username: username,
                password: password,
              });
              if (result.type == 'S') {
                await AsyncStorage.setItem('user', username);
                await AsyncStorage.setItem('pass', password);
                signIn({
                  username: username,
                  password: password,
                  updateState: updateState,
                });
              } else {
                updateState({
                  loading: false,
                  warning: result.warning,
                });
              }
            }
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1.5, y: 2.0}}
            colors={['#d47313', '#f74e00', '#f72900', '#f73e00']}
            style={styles.btnLogin}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
              Đăng nhập
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: -200,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    width: 120,
    height: 110,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 23,
    backgroundColor: '#0c5cab',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    marginVertical: 5,
    paddingLeft: 50,
    backgroundColor: '#E8E8E8',
    borderColor: 'transparent',
    paddingRight: 50,
    // paddingRight: 125
  },
  inputIcon: {
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 2,
  },
  btnLogin: {
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    borderColor: 'transparent',
  },
});
