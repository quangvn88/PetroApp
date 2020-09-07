import * as React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import Loading from '../../../../common/loading';
import AppStyle from '../../../../theme';
import Item from './item';

import { release } from '../../../../containers/screens/OrderApprovalScreen';

export default function Credit({ orders, updateOrders, index, order }) {
    // Loading
    const [loading, updateLoading] = React.useState(false);
    const [orderDetail, updateOrderDetail] = React.useState(false);
    const [itemDetail, updateItemDetail] = React.useState(false);
    const items = order.LISTMATHANG;
    // Trạng thái: Đã release hoặc chưa release
    const [isReleased, updateReleased] = React.useState(order.FRGKE === 'A');
    // Release Đơn hàng
    const releaseOrder = () => {
        updateReleased(true);
        let newOrders = [...orders.orders];
        newOrders[index].FRGKE = 'A';
        updateOrders({
            ...orders,
            oders: [...newOrders],
            warning: ''
        })
    };
    return (
        <View style={{ backgroundColor: '#dfe6e9', paddingVertical: 10 }}>
            <Loading loading={loading} />
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        paddingLeft: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    delayPressIn={0}
                    onPress={() => updateOrderDetail(!orderDetail)}
                >
                    <Icon name={orderDetail ? 'minuscircleo' : 'pluscircleo'} size={20} />
                    <View style={{ flex: 1, marginLeft: 5 }}>
                        <Text>Đơn hàng:{' '}<Text style={{ fontWeight: 'bold' }}>
                            {order.EBELN}</Text>
                        </Text>
                        <Text>Đơn vị:{' '}<Text style={{ fontWeight: 'bold' }}>
                            {order.BUKRS}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
                {!isReleased ? (
                    <TouchableOpacity
                        style={{ justifyContent: 'center' }}
                        delayPressIn={0}
                        onPress={() => {
                            Alert.alert(
                                'Phê duyệt',
                                'Phê duyệt đơn hàng số: ' + order.EBELN,
                                [
                                    {
                                        text: 'Hủy bỏ',
                                        onPress: () => { },
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Đồng ý',
                                        onPress: async () => {
                                            updateLoading(true);
                                            const resultRelease = await release({ ebeln: order.EBELN });
                                            updateLoading(false);
                                            if (resultRelease.type == 'S') {
                                                // Update trạng thái
                                                setTimeout(() => {
                                                    Alert.alert('Phê duyệt thành công',
                                                        'Đơn hàng số: ' + order.EBELN,
                                                        [
                                                            {
                                                                text: "OK", onPress: () =>
                                                                    releaseOrder()
                                                            }
                                                        ],
                                                        { cancelable: false }
                                                    );
                                                }, 200)

                                            } else if (resultRelease.type == 'W') {
                                                updateOrders({
                                                    ...orders,
                                                    warning: resultRelease.warning
                                                })
                                            }
                                            else {
                                                updateOrders({
                                                    ...orders,
                                                    warning: 'Có lỗi xảy ra, vui lòng thử lại'
                                                })
                                            }
                                        }
                                    }
                                ]
                            );
                        }}
                    >
                        <View style={AppStyle.StyleCommon.btnRelease}>
                            <Feather name='unlock' color='white' size={18} />
                            <Text style={{ color: 'white', marginLeft: 5, marginBottom: 2 }}>Release</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center', marginRight: 5, padding: 5,
                                paddingHorizontal: 10,
                            }}
                            delayPressIn={0}
                            onPress={() => updateOrderDetail(!orderDetail)}
                        >
                            <Text style={{ fontStyle: 'italic', color: '#7a8085' }}>Đã phê duyệt</Text>
                        </TouchableOpacity>
                        // <View style={{
                        //     justifyContent: 'center', marginRight: 5, padding: 5,
                        //     paddingHorizontal: 10,
                        // }}>
                        // </View>
                    )}
            </View>
            {
                orderDetail ? (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 5 }}
                        delayPressIn={0}
                        onPress={() => updateOrderDetail(!orderDetail)}
                    >
                        <Text style={{ fontWeight: 'bold', marginLeft: 25 }}>{order.BUTXT}</Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            delayPressIn={0}
                            onPress={() => updateItemDetail(!itemDetail)}
                        >
                            <Icon name={itemDetail ? 'minuscircleo' : 'pluscircleo'} size={20} />
                            <Text style={{ textAlignVertical: 'center', marginLeft: 5 }}>Mặt hàng</Text>
                        </TouchableOpacity>
                        {itemDetail ? (
                            <TouchableOpacity
                                delayPressIn={0}
                                onPress={() => updateItemDetail(!itemDetail)}
                            >
                                <FlatList
                                    data={items}
                                    renderItem={({ item }) =>
                                        <Item
                                            item={item}
                                        />}
                                    keyExtractor={(item, index) => `${index}`}
                                />
                            </TouchableOpacity>
                        ) : null}
                    </TouchableOpacity>
                ) : null
            }
        </View >
    );
};


