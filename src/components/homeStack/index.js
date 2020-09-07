import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    View,
    StyleSheet
} from 'react-native';

import HomeScreen from './homeScreen'
import {
    OrderApprovalScreen,
    NegativeApprovalScreen,
    ReportScreen,
    PoScreen,
    CreditApprovalScreen,
    UnlockUserScreen,
    UnlockWarehouseScreen,
    UnlockAccountingScreen,
} from '../screens';

const Stack = createStackNavigator();

export default function HomeStack({ navigation, userAuth, route, functionList }) {
    React.useEffect(() => {
        navigation.setOptions({ headerMode: route.state && route.state.index > 0 ? 'screen' : 'none' });
    }, [])
    return (
        <Stack.Navigator
            screenOptions={({ route }) => {
                return {
                    headerBackTitle: ' ',
                    headerStyle: {
                        ...styles.headerStyle,
                        borderBottomColor: route.name == 'Home' ? '#4169E1' : '#FB7200'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                }
            }
            }
        >
            <Stack.Screen name="Home"
                children={props =>
                    <HomeScreen
                        {...props}
                        userAuth={userAuth}
                        openDrawer={navigation}
                        functionList={functionList}
                    />}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="OrderApproval"
                component={OrderApprovalScreen}
                options={{
                    animationTypeForReplace: 'pop',
                    title: 'Phê duyệt đơn hàng',
                    headerRight: () => (<View />),
                }}
            />
            <Stack.Screen
                name="NegativeApproval"
                component={NegativeApprovalScreen}
                options={{
                    title: 'Cho phép xuất âm',
                    headerRight: () => (<View />),
                }}
            />
            <Stack.Screen
                name="DeclareCycle"
                component={PoScreen}
                options={{
                    title: 'Khai báo PO CKG',
                    headerRight: () => (<View />),
                }}
            />
            <Stack.Screen
                name="QuantityRevenue"
                component={ReportScreen}
                options={{
                    title: 'Sản lượng, Doanh thu',
                    headerRight: () => (<View />),
                }}
            />
            <Stack.Screen
                name="CreditApproval"
                component={CreditApprovalScreen}
                options={{
                    title: 'Phê duyệt tín dụng',
                    headerRight: () => (<View />),
                }}
            />
            <Stack.Screen
                name="UnlockUser"
                component={UnlockUserScreen}
                options={{
                    title: 'Mở khóa tài khoản',
                    headerRight: () => (<View />),
                }}
            />
            <Stack.Screen
                name="UnlockWarehouse"
                component={UnlockWarehouseScreen}
                options={{
                    title: 'Mở kỳ kho',
                    headerRight: () => (<View />),
                }}
            />
            <Stack.Screen
                name="UnlockAccounting"
                component={UnlockAccountingScreen}
                options={{
                    title: 'Mở kỳ kế toán',
                    headerRight: () => (<View />),
                }}
            />
        </Stack.Navigator >
    );
}
const styles = StyleSheet.create({
    containerDrawer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 3,
        marginHorizontal: 11
    },
    buttonDrawer: {
        margin: 3,
    },
    headerStyle: {
        backgroundColor: '#4169E1',
        borderBottomWidth: 3,
        shadowOffset: {
            width: 0,
            height: 0
        }
    }
});
