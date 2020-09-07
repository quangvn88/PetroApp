import AsyncStorage from '@react-native-community/async-storage';

import { getData } from './getData';

export const updateData = async (props) => {
    const { username, password, updateUserAuth } = props;
    //Clear old data
    await AsyncStorage.removeItem('listCompanyCode');
    await AsyncStorage.removeItem('listPlantCode');
    await AsyncStorage.removeItem('listItemCode');
    await AsyncStorage.removeItem('listUserName');
    await AsyncStorage.removeItem('userDetail');
    await AsyncStorage.removeItem('userAuth');
    //Get data
    await getData({
        username: username,
        password: password
    });
    //update auth
    let auth = await AsyncStorage.getItem('userAuth');
    await updateUserAuth(JSON.parse(auth))
}