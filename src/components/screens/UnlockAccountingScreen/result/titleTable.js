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
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <View >
                        <Text style={{ color: '#dfe6e9' }}>6610</Text>
                    </View>
                    <View style={{ position: 'absolute' }}>
                        <Text>Code</Text>
                    </View>
                </View>
                <View style={{ ...styles.titleTable }}>
                    <Text>Type</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <Text>Từ Kỳ</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <View >
                        <Text style={{ color: '#dfe6e9' }}>2020</Text>
                    </View>
                    <View style={{ position: 'absolute' }}>
                        <Text>Năm</Text>
                    </View>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <Text>Đến Kỳ</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <View >
                        <Text style={{ color: '#dfe6e9' }}>2020</Text>
                    </View>
                    <View style={{ position: 'absolute' }}>
                        <Text>Năm</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleTable: {
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
});