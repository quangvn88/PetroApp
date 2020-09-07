import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Alert,
    SafeAreaView,
    Dimensions
} from 'react-native';
import {
    DrawerItemList,
    DrawerItem,
    createDrawerNavigator,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import HomeStack from '../../components/homeStack';
import AboutApp from './about';
import { AuthContext } from '../../components/auth/utils';
import { updateData } from '../../containers/drawer';
import Loading from '../../common/loading';
import { functions } from '../../utils';

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('window').width;

function MyDrawer(props) {
    const { auth } = props;
    const [userAuth, updateUserAuth] = React.useState(auth ? JSON.parse(auth) : {});
    const functionList = functions.filter((e) => {
        return userAuth[e.keyAuth] === 'X';
    });
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerStyle={styles.drawerStyle}
            drawerContentOptions={{
                activeTintColor: '#4169E1',
                contentContainerStyle: {
                    backgroundColor: '#fff'
                },
                style: {

                },
                padding: 0,
                itemStyle: styles.itemStyle,
                labelStyle: styles.labelStyle,
            }}
            screenOptions={{ swipeEnabled: false }}
            drawerContent={
                props =>
                    <CustomDrawerContent {...props}
                        updateUserAuth={updateUserAuth.bind(this)}
                    />
            }
        >
            <Drawer.Screen
                name='Home'
                children={(props) =>
                    <HomeStack {...props} userAuth={userAuth} functionList={functionList} />
                }
                options={{
                    drawerLabel: ({ color }) =>
                        <Text
                            style={[styles.labelStyle, { color: color }]
                            }>Trang chủ</Text>,
                    drawerIcon: () =>
                        <MaterialCommunityIcons name='home' color={'#4169E1'} size={30} />,
                }}
            />
            {/* <Drawer.Screen
                name='About'
                children={(props) =>
                    <AboutApp {...props} />
                }
                options={{
                    drawerLabel: ({ focused }) =>
                        <Text
                            style={[styles.labelStyle, focused ? { color: '#d6d306' } : { color: 'rgba(28,28,30,0.68)' }]}
                        >Giới thiệu</Text>,
                    drawerIcon: () =>
                        <MaterialCommunityIcons name='information-outline' color={'#d6d306'} size={30} />,
                }}
            /> */}
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props) {
    const { navigation, updateUserAuth } = props;

    const { signOut } = React.useContext(AuthContext);

    const updatingData = async () => {
        navigation.closeDrawer();
        showLoading(true);
        //get user and pass
        const user = await AsyncStorage.getItem('user');
        const pass = await AsyncStorage.getItem('pass');
        //update Data
        await updateData({
            username: user,
            password: pass,
            updateUserAuth: updateUserAuth
        });
        showLoading(false);
        setTimeout(() => {
            Alert.alert('Thành công', 'Cập nhật dữ liệu thành công');
        }, 200)
    }
    const [loading, showLoading] = React.useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: '#4169e1' }}>
            <StatusBar backgroundColor='#4169e1' barStyle='light-content' />
            <Loading loading={loading} />
            <SafeAreaView>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={styles.headerDrawer}>
                        <View style={styles.wrapLogo}>
                            <Image
                                style={styles.logo}
                                source={require('../../assets/logo.png')}
                            />
                        </View>
                        <View style={styles.wrapTextLogo}>
                            <Text style={styles.textLogo}>PETROLIMEX</Text>
                        </View>
                    </View>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label={() => <Text style={styles.labelStyle}>Cập nhật</Text>}
                        onPress={async () => {
                            await updatingData();
                        }}
                        icon={() => <MaterialCommunityIcons color={'#3eb516'} size={30} name='update' />}
                        labelStyle={styles.labelStyle}
                        style={[styles.itemStyle, { marginTop: 0 }]}
                    />
                    <DrawerItem
                        label={() => <Text style={styles.labelStyle}>Đăng xuất</Text>}
                        onPress={() => { signOut() }}
                        icon={() => <MaterialCommunityIcons color={'#d11515'} size={30} name='logout' />}
                        labelStyle={styles.labelStyle}
                        style={[styles.itemStyle, { marginTop: 20 }]}
                    />
                </View>
            </SafeAreaView>
            <View style={{ backgroundColor: 'white', flex: 1 }}>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    itemStyle: {
        width: '90%',
        marginLeft: 0,
        borderColor: 'transparent',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    drawerStyle: {
        padding: 0,
        margin: 0,
        width: screenWidth - 100,
        borderBottomColor: '#adadad',
        borderBottomWidth: 0.5
    },
    labelStyle: {
        fontSize: 17
    },
    headerDrawer: {
        borderBottomColor: 'orange',
        borderBottomWidth: (2),
        padding: (4),
        marginBottom: (10),
        flexDirection: 'row',
        backgroundColor: '#4169E1',
    },
    wrapLogo: {
        borderColor: 'white',
        borderWidth: (2),
        borderTopLeftRadius: (8),
        borderBottomRightRadius: (10),
        backgroundColor: '#0c5cab'
    },
    logo: {
        height: 40,
        width: 40
    },
    wrapTextLogo: {
        justifyContent: 'center',
        marginLeft: (20)
    },
    textLogo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    }
})

export default function DrawerStack(props) {
    const { auth, navigation } = props;
    return (
        <MyDrawer auth={auth} />
    );
}



