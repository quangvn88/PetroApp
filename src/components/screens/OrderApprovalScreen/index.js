import * as React from 'react';
import {
    View,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import AppStyle from '../../../theme';
import Param from './param';
import Warning from '../../../common/warning';
import Result from './result';


export const OrderApprovalScreen = () => {
    const [orders, updateOrders] = React.useState(
        {
            orders: [],
            warning: '',
            isNewOrders: false
        }
    );
    const result = React.useMemo(() =>
        <Result
            orders={orders}
            updateOrders={updateOrders}
        />
        , [orders.isNewOrders]);
    const paramComponent = React.useMemo(() =>
        <Param
            orders={orders}
            updateOrders={updateOrders}
        />
        , [orders.isNewOrders]
    )
    return (

        <View style={AppStyle.StyleCommon.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <>
                    {paramComponent}
                    {/* Thông báo lỗi */}
                    <Warning warning={orders.warning} />
                </>
            </TouchableWithoutFeedback>
            {orders.orders.length !== 0 ? result :
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
            }
        </View>
    );

};