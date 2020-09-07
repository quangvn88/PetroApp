import * as React from 'react';
import {
    View,
    FlatList
} from 'react-native';
import Item from './itemContent';

export default function Content({ data }) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) =>
                <View style={{ marginBottom: 15 }}>
                    <Item
                        item={item}
                    />
                </View>
            }
            keyExtractor={(item, index) => `${index}`}
        />
    );
};

