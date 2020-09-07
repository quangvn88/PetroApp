import * as React from 'react';
import {
    View,
    Text,
} from 'react-native'

export function Sum({ chartValue, isQuantity }) {
    const sum = isQuantity ?
        (chartValue.ESUM_FKLMG_ND + chartValue.ESUM_FKLMG_TX)
        : (chartValue.ESUM_NETWR_ND + chartValue.ESUM_NETWR_TX)

    const unit = isQuantity ? 'L15' : 'VNĐ';

    const convertNumber = (num) => {
        var str = num.toString();
        var result = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return result;
    };
    return (
        <View style={{ borderBottomWidth: 1, marginBottom: 15, paddingBottom: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Tổng</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>{convertNumber(sum)} </Text>
                    <Text style={{ fontWeight: 'bold' }}>({unit})</Text>
                </View>
            </View>
        </View >
    )
}