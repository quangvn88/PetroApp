import * as React from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';

export default function Type({ onChangeType }) {
    const data = [
        {
            key: '.',
            des: 'Tất cả'
        },
        {
            key: '+',
            des: 'Valid for all account type'
        },
        {
            key: 'A',
            des: 'Assets'
        },
        {
            key: 'D',
            des: 'Customers'
        },
        {
            key: 'K',
            des: 'Vendors'
        },
        {
            key: 'M',
            des: 'Materials'
        },
        {
            key: 'S',
            des: 'G/L accounts'
        }
    ];
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                    onPress={() => {
                        onChangeType({
                            type: item.key,
                            idVisible: false
                        })
                    }}
                    style={{
                        backgroundColor: '#2b8fed',
                        margin: 5,
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                    }}
                >
                    <Text style={{ color: 'white', marginRight: item.key == '' ? 0 : 15 }}>{item.key}</Text>
                    <Text style={{ color: 'white' }}>{item.des}</Text>
                </TouchableOpacity>
            }
            keyExtractor={(item, index) => `${index}`}
        />
    );
}