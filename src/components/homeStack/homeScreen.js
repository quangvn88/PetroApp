import * as React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import HeaderBackground from './headerBackground';
import Header from './header';
import Function from './function';
// import { functions } from '../../utils';

export default function HomeScreen({ openDrawer, userAuth, navigation, functionList }) {
    const [userDetail, setUserDetail] = React.useState({});
    // const [functionList, updateFunctionList] = React.useState([]);
    const isEvenLength = functionList.length % 2 == 0;

    React.useEffect(() => {
        const getDetail = async () => {
            let detail = await AsyncStorage.getItem('userDetail');
            if (detail)
                await setUserDetail(JSON.parse(detail));
        }
        getDetail();
    }, [userDetail])
    return (
        <View style={styles.container}>
            <HeaderBackground />
            <Header openDrawer={openDrawer} userDetail={userDetail} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={functionList}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {/* <View style={{ flex: 1 }}> */}
                                <Function
                                    functionProps={item}
                                    imageSource={item.imageUrl}
                                    onPress={() => {
                                        navigation.navigate(item.name, { userAuth: userAuth });
                                    }}
                                />
                                {/* </View> */}
                                {!isEvenLength && (index == functionList.length - 1) ? <View style={{ flex: 1 }}>
                                </View> : null}
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => `${index}`}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
