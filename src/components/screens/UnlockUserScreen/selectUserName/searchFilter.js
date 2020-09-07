import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchFilter = ({ placeholder, listData, setModalVisible, selectedItem }) => {
    const [search, onChangeSearch] = React.useState('');
    const [arrayholder] = React.useState(listData);
    const [data, updateData] = React.useState(listData);
    //function filter
    const searchFilterFunction = text => {
        onChangeSearch(text);
        const newData = arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        updateData(newData);
    };
    const toggleModal = () => {
        setModalVisible(false);
    };
    // const selectBukrs = placeholder === 'Mã công ty...' ? true : false;
    // const numberCode = placeholder === 'Mã mặt hàng...' ? 7 :
    //     placeholder === 'Mã công ty...' || placeholder === 'Mã kho...' ? 4 : 6;
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <SearchBar
                        autoFocus={false}
                        searchIcon={{ size: 30 }}
                        clearIcon={{ size: 30 }}
                        placeholder={placeholder}
                        onChangeText={searchFilterFunction}
                        value={search}
                        lightTheme
                        round
                        inputContainerStyle={{
                            backgroundColor: '#d9dcde'
                        }}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            borderTopColor: 'transparent',
                            borderBottomColor: 'transparent'
                        }}
                    />
                </View>
            </View>
            {/* Content Search */}
            <View style={{ flex: 1, marginTop: 10 }}>
                <Item
                    data={data}
                    setModalVisible={setModalVisible}
                    selectedItem={selectedItem}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={toggleModal}
                >
                    <AntDesign name='closecircleo' size={35} color={'red'} />
                </TouchableOpacity>
            </View>
        </View >
    );
}

const Item = ({ data, setModalVisible, selectedItem }) => {
    const toggleModal = (item) => {
        setModalVisible(false);
        selectedItem(item.name);
    };
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => toggleModal(item)}
                    style={styles.item}
                >
                    <Text style={{ color: 'white' }}>{item.name}</Text>
                </TouchableOpacity>
            }
            keyExtractor={(item, index) => `${index}`}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#2b8fed',
        padding: 15,
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 10
    },

    // item: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     alignItems: 'center',
    //     marginBottom: 5
    // },
    textItem: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#2b8fed',
        flex: 1
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    }
})

export default SearchFilter;