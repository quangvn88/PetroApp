import * as React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const screenWidth = Dimensions.get("window").width;

function AboutScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1 }}>
                {/* <Intro /> */}
            </View>
            <View style={{ alignItems: 'center', backgroundColor: '#eb911c' }}>
                <Text style={{ color: 'white', fontSize: 17 }}>Phiên bản 1.0.0</Text>
            </View>
        </View >
    )
}

const Stack = createStackNavigator();

export default function About({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="About"
            screenOptions={() => {
                return {
                    headerStyle: styles.headerStyle,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                }
            }}
        >
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{
                    title: 'Thông tin ứng dụng',
                    headerRight: () => (<View />),
                    headerLeft: () => (
                        <TouchableOpacity
                            style={styles.containerDrawer}
                            onPress={() => navigation.openDrawer()}
                        >
                            <View style={styles.buttonDrawer}>
                                <MaterialCommunityIcons name="menu" color='#fff' size={24} />
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    headerStyle: {
        backgroundColor: '#4169E1',
        borderBottomWidth: 3,
        borderBottomColor: '#FB7200'
    },
    containerDrawer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 3,
        marginHorizontal: 11
    },
    buttonDrawer: {
        margin: 3,
    },
})