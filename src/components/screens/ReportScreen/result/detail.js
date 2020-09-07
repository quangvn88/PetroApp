import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { convertNumber, sumQuantity, sumRevenue } from './handleValue';

export const Detail = ({ listValue, isQuantity }) => {
    return (
        <FlatList
            data={listValue}
            renderItem={({ item }) =>
                <View style={{ marginBottom: 15 }}>
                    <TypeValue item={item} isQuantity={isQuantity} />
                </View>
            }
            keyExtractor={(item, index) => `${index}`}
        />
    );
}

const TypeValue = ({ item, isQuantity }) => {
    const [isDetail, showDetail] = React.useState(false);
    const sum = isQuantity ? sumQuantity(item.LISTMATHANG) : sumRevenue(item.LISTMATHANG);
    return (
        <View>
            <TouchableOpacity
                onPress={() => showDetail(!isDetail)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name={isDetail ? 'minuscircleo' : 'pluscircleo'} size={20} />
                    <View style={{ marginLeft: 5, flex: 1 }}>
                        <Text>{item.VTEXT}<Text style={{ fontWeight: 'bold' }}>
                            {': ' + convertNumber(sum)}({isQuantity ? 'L15' : 'VNĐ'})</Text>
                        </Text>
                    </View>
                </View>
                {isDetail ? (
                    <FlatList
                        data={item.LISTMATHANG}
                        renderItem={({ item }) =>
                            <Item item={item} isQuantity={isQuantity} />
                        }
                        keyExtractor={(item, index) => `${index}`}
                    />
                ) : null}
            </TouchableOpacity>
        </View >
    );
};

const Item = ({ item, isQuantity }) => {
    const sum = isQuantity ? (item.FKLMG_TX + item.FKLMG_ND) : (item.NETWR_ND + item.NETWR_TX);
    return (
        <View>
            <Text>{item.MAKTX}{': '}<Text style={{ fontWeight: 'bold' }}>
                {convertNumber(sum)}({isQuantity ? 'L15' : 'VNĐ'})</Text>
            </Text>
        </View>
    );
}