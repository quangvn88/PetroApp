import * as React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Title() {
    return (
        <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...styles.titleTable, flex: 5 }}>
                    <View >
                        <Text style={{ color: '#dfe6e9' }}>30.04.2020</Text>
                    </View>
                    <View style={{ position: 'absolute' }}>
                        <Text>Ngày CKG</Text>
                    </View>
                </View>
                <View style={{ ...styles.titleTable, flex: 4 }}>
                    <Text>Thời gian</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 2 }}>
                    <View>
                        <Text style={{ color: '#dfe6e9' }}>2020</Text>
                    </View>
                    <View style={{ position: 'absolute' }}>
                        <Text>Năm</Text>
                    </View>
                </View>
                <View style={{ ...styles.titleTable, flex: 3 }}>
                    <Text>Tháng</Text>
                </View>
                <View style={{ ...styles.titleTable, flex: 1 }}>
                    <View >
                        <Text style={{ color: '#dfe6e9' }}>01</Text>
                    </View>
                    <View style={{ position: 'absolute' }}>
                        <Text>Kỳ</Text>
                    </View>
                </View>
                <View style={{ ...styles.titleTable, }}>
                    <Icon name='delete' size={28} color='#dfe6e9' />
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