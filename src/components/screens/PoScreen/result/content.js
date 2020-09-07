import * as React from 'react';
import {
    View,
    FlatList
} from 'react-native';
import Item from './itemContent';

export default function Content({ result, handleResult }) {
    return (
        <FlatList
            data={result.data}
            renderItem={({ item, index }) =>
                <View style={{ marginBottom: 15 }}>
                    <Item
                        index={index}
                        result={result}
                        item={item}
                        handleResult={handleResult}
                    />
                </View>
            }
            keyExtractor={(item, index) => `${index}`}
        />
    );
};

