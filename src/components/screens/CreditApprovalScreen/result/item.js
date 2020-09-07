import * as React from 'react';
import {
    View,
    Text,
} from 'react-native';

const convertNumber = (num) => {
    var str = num.toString();
    var result = str.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return result;
};

export default function Item({ item }) {
    return (
        <View style={{ flex: 1 }}>
            <Text>{item.MATHANG}:{' '}<Text style={{ fontWeight: 'bold' }}>
                {convertNumber(item.SOLUONG)}({item.DONVI})</Text>
            </Text>
        </View>
    );
};
