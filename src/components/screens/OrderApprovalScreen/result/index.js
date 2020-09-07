import * as React from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import Order from './order';

export default function Result({ orders, updateOrders }) {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={orders.orders}
                renderItem={({ item, index }) =>
                    <View style={{ marginBottom: 15 }}>
                        <Order
                            order={item}
                            index={index}
                            updateOrders={updateOrders}
                            orders={orders}
                        />
                    </View>
                }
                keyExtractor={(item, index) => item.EBELN}
            />
        </View>
    );
};