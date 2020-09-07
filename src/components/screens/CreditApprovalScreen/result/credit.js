import * as React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements';

import Item from './item';

const convertNumber = (num) => {
    var str = num.toString();
    var result = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return result;
};

export default function Credit({ credit, index, checkCredit }) {
    const [creditDetail, updateCreditDetail] = React.useState(false);
    const [itemDetail, updateItemDetail] = React.useState(false);
    const items = credit.LISTMATHANG;
    const [checked, creditChecked] = React.useState(false);

    const handleChecked = () => {
        if (checked) {
            creditChecked(false);
            checkCredit(index, false);
            // checkCredit(index, false);
        } else {
            creditChecked(true);
            checkCredit(index, true);
            // checkCredit(index, true);
        };
    };
    return (
        <View style={{ backgroundColor: '#dfe6e9', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ flex: 1, paddingLeft: 5 }}
                    delayPressIn={0}
                    onPress={() => updateCreditDetail(!creditDetail)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name={creditDetail ? 'minuscircleo' : 'pluscircleo'} size={20} />
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Lệnh xuất: </Text>
                                <Text style={{ fontWeight: 'bold' }}>{credit.VBELN}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Delivery Date: </Text>
                                <Text style={{ fontWeight: 'bold' }}>{credit.NGAYXUAT}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <CheckBox
                    containerStyle={{
                        borderWidth: 0,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        margin: 0,
                    }}
                    checked={checked}
                    onPress={() => handleChecked()}
                />
            </View>
            {creditDetail ? (
                <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    delayPressIn={0}
                    onPress={() => updateCreditDetail(!creditDetail)}
                >
                    <Text style={{ fontWeight: 'bold' }}>{credit.KHACHHANG}</Text>
                    <Text style={{ flex: 1 }}>Hạn mức:{' '}<Text style={{ fontWeight: 'bold' }} >
                        {convertNumber(credit.HANMUC)}(VNĐ)</Text>
                    </Text>
                    <Text style={{ flex: 1 }}>Công nợ:{' '}<Text style={{ fontWeight: 'bold' }} >
                        {convertNumber(credit.CONGNO)}(VNĐ)</Text>
                    </Text>
                    <Text style={{ flex: 1 }}>Hạn mức còn lại:{' '}<Text style={{ fontWeight: 'bold' }} >
                        {convertNumber(credit.HMCONLAI)}(VNĐ)</Text>
                    </Text>
                    <Text style={{ flex: 1 }}>Tổng nợ đáo hạn:{' '}<Text style={{ fontWeight: 'bold' }} >
                        {convertNumber(credit.E_DMBTR)}(VNĐ)</Text>
                    </Text>
                    <Text style={{ flex: 1 }}>Số đáo hạn dài nhất:{' '}<Text style={{ fontWeight: 'bold' }} >
                        {convertNumber(credit.E_MAX_DUE)}(Ngày)</Text>
                    </Text>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        delayPressIn={0}
                        onPress={() => updateItemDetail(!itemDetail)}
                    >
                        <Icon name={itemDetail ? 'minuscircleo' : 'pluscircleo'} size={20} />
                        <Text style={{ marginLeft: 5 }}>Mặt hàng</Text>
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
            ) : null}
        </View >
    );
};


