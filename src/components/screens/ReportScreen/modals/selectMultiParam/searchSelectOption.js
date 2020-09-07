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

import Warning from '../../../../../common/warning';

const SearchFilter = ({ placeholder, kunnrs, handleKunnrs }) => {
    const [kunnrSelected, updateSelected] = React.useState([...kunnrs.kunnrs]);
    const [search, onChangeSearch] = React.useState('');
    const [warning, updateWarning] = React.useState('');
    const checkParam = (param) => {
        return param == '';
    };
    const addParam = (param) => {
        let newList = [...kunnrSelected];
        newList.push(param);
        updateSelected(newList);
        onChangeSearch('');
    };
    const removeSelected = (index) => {
        let newList = [...kunnrSelected];
        newList.splice(index, 1);
        updateSelected(newList);
    };
    const toggleModal = () => {
        handleKunnrs({ ...kunnrs, isVisible: false });
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <SearchBar
                        autoFocus={true}
                        searchIcon={{ size: 30 }}
                        clearIcon={{ size: 30 }}
                        returnKeyType='done'
                        maxLength={6}
                        placeholder={placeholder}
                        onChangeText={onChangeSearch}
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
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                        if (checkParam(search)) {
                            updateWarning('Chưa nhập ' + placeholder.substring(0, placeholder.length - 3));
                        }
                        else {
                            updateWarning('');
                            addParam(search);
                        }
                    }}
                    style={{ justifyContent: 'center', marginRight: 5 }}
                >
                    <AntDesign name={"pluscircleo"} size={35} color={"#2196f3"} />
                </TouchableOpacity>
            </View>
            <Warning warning={warning} />
            <View style={{ flex: 1, marginTop: 10 }}>
                {kunnrSelected.length !== 0 ?
                    <FlatList
                        initialNumToRender={kunnrSelected.length - 1}
                        data={kunnrSelected}
                        renderItem={({ item, index }) =>
                            <Item item={item} index={index} removeSelected={removeSelected} />
                        }
                        keyExtractor={(item, index) => `${index}`}
                    /> : null}
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                        // set kunnrs
                        handleKunnrs({
                            kunnrs: [...kunnrSelected],
                            isVisible: false,
                            kunnrsSelected: [...kunnrSelected]
                        })
                    }}
                >
                    <AntDesign name='checkcircleo' size={35} color={'green'} />
                </TouchableOpacity>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                        // clear listParam
                        updateSelected([]);
                    }}
                >
                    <AntDesign name='delete' size={35} color={'grey'} />
                </TouchableOpacity>
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

const Item = ({ item, index, removeSelected }) => {
    return (
        <View style={styles.item}>
            <View style={styles.textItem}>
                <Text style={{ color: 'white' }}>{item}</Text>
            </View>
            <TouchableOpacity
                delayPressIn={0}
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                    removeSelected(index);
                }}
            >
                <AntDesign name="closecircle" size={25} color={'red'}></AntDesign>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 5
    },
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