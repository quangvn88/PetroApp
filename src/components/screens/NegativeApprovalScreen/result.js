import * as React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

// import Title from './titleTable';
// import Content from './content';

export default function Result({ result }) {
    return (
        <View style={styles.container}>
            <Text style={{ marginVertical: 5 }}>Mặt hàng:{' '}<Text style={{ fontWeight: 'bold' }}>
                {result.MATNR}{!checkEmpty(result) ? ' - ' : ''}{result.MAKTX}</Text>
            </Text>
            <Text style={{ marginVertical: 5 }}>Kho:{' '}<Text style={{ fontWeight: 'bold' }}>
                {result.WERKS}{!checkEmpty(result) ? ' - ' : ''}{result.NAME}</Text>
            </Text>
            <Text style={{ marginVertical: 5 }}>Tồn hiện tại:{' '}<Text style={{ fontWeight: 'bold' }}>
                {result.LBKUM}{!checkEmpty(result) ? ' (' : ''}
                {result.MEINS}{!checkEmpty(result) ? ')' : ''}</Text>
            </Text>
        </View>
    );
};

const checkEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

const styles = StyleSheet.create({
    container:
    {
        padding: 5,
        backgroundColor: '#dfe6e9',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 5
    }
});