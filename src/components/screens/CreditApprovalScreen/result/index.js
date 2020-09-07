import * as React from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import Credit from './credit';

export default function Result({ credits, updateCredits }) {
    const checkCredit = (index, checked) => {
        let newArray = [...credits.credits];
        credits.credits[index].checked = checked;
        updateCredits({ ...credits, credits: [...newArray] });
    }
    const listCredit = React.useMemo(() =>
        <View style={{ flex: 1 }}>
            <FlatList
                data={credits.credits}
                renderItem={({ item, index }) =>
                    <View style={{ marginBottom: 15 }}>
                        <Credit
                            credit={item}
                            checkCredit={checkCredit}
                            index={index}
                        />
                    </View>
                }
                keyExtractor={(item, index) => item.VBELN}
            />
        </View>
        , [credits.credits])
    return (
        <>
            {listCredit}
        </>
    );
};