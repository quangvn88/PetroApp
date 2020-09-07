import AsyncStorage from "@react-native-community/async-storage";

export const getListBukrs = async () => {
    let result = [];
    await AsyncStorage.getItem('listCompanyCode').then(data => {
        result = (JSON.parse(data));
    });
    return result;
}

export const getListMatnr = async () => {
    let result = [];
    await AsyncStorage.getItem('listItemCode').then(data => {
        result = (JSON.parse(data));
    });
    return result;
}

export const getListPlant = async () => {
    let result = [];
    await AsyncStorage.getItem('listPlantCode').then(data => {
        result = (JSON.parse(data));
    });
    return result;
}

export const getListUser = async () => {
    let result = [];
    await AsyncStorage.getItem('listUserName').then(data => {
        result = (JSON.parse(data));
    });
    return result;
}
