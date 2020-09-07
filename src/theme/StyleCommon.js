import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StyleCommon = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    btnText: {
        color: 'white',
        lineHeight: 28,
    },
    textInput: {
        height: 28,
        flex: 1,
        padding: 0,
        paddingLeft: 5,
    },
    textInputContainer: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent',
        backgroundColor: '#dfe6e9',
    },
    titleInput: {
        marginHorizontal: 8,
        marginBottom: -5
    },
    btnSearchHelp: {
        justifyContent: 'center',
    },
    btnSearch: {
        backgroundColor: '#2196f3',
        marginRight: 5,
        marginHorizontal: 5,
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent',
        alignItems: 'center'
    },
    btnRelease: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#269617',
        marginRight: 5,
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'transparent',
    },
    backdrop: {
        height: screenHeight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
    },
    checkBox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginLeft: 5,
        marginRight: 5,
        margin: 0,
        padding: 0,
        justifyContent: 'center'
    }
});

export default StyleCommon;