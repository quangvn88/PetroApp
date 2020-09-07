import * as React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Modal,
    SafeAreaView
} from 'react-native';

import Search from './searchFilter';

const screenHeight = Dimensions.get('window').height;

const SearchModal = ({ isVisible, setModalVisible, placeholder, listData, onChangeParam }) => {
    return (
        <Modal
            isVisible={isVisible}
            transparent
            animationType={'slide'}
            animationInTiming={400}
            animationOutTiming={200}
        >
            <View style={styles.backdrop} />
            {/* Content */}
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Search
                            placeholder={placeholder}
                            listData={listData}
                            setModalVisible={setModalVisible}
                            selectedItem={onChangeParam}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: screenHeight / 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    backdrop: {
        height: screenHeight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.5,
        backgroundColor: 'black',
    },
});

export default SearchModal;