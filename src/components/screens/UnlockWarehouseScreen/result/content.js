import * as React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

export default function Content({ data }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <Text>{data.BUKRS}</Text>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Từ Tháng</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{data.VMMON}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Từ Năm</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{data.VMGJA}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Đến Tháng</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{data.LFMON}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Đến Năm</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{data.LFGJA}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleTable: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});