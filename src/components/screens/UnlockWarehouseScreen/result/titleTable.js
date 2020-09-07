import * as React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
export default function Title() {
    return (
        <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...styles.titleTable, flex: 1, marginRight: 10 }}>
                    <View >
                        <Text style={{ color: '#dfe6e9' }}>6610</Text>
                    </View>
                    <View style={{ position: 'absolute' }}>
                        <Text>Code</Text>
                    </View>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <Text>Từ Tháng</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <Text>Từ Năm</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <Text>Đến Tháng</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <Text>Đến Năm</Text>
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