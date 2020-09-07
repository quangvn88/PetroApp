import * as React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

export default function Item({ item }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <Text>{item.BUKRS}</Text>
            </View>
            <View style={styles.titleTable}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Type</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{item.MKOAR}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <View>
                    <Text style={{ color: '#dfe6e9' }}>Từ Kỳ</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{item.FRPE1.substring(1)}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <Text>{item.FRYE1}</Text>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <View >
                    <Text style={{ color: '#dfe6e9' }}>Đến Kỳ</Text>
                </View>
                <View style={{ position: 'absolute' }}>
                    <Text>{item.TOPE1.substring(1)}</Text>
                </View>
            </View>
            <View style={{ ...styles.titleTable, flex: 1 }}>
                <Text>{item.TOYE1}</Text>
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