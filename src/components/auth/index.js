import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignInScreen } from './SignInScreen';
import { SplashScreen } from './SpashScreen';
import DrawerStack from '../../navigators/drawer';
import ModalUpdating from './ModalUpdating';
import { CodePush } from '../../utils';
import { AuthContext } from './utils';
import { getData } from '../../containers/drawer';

const Stack = createStackNavigator();

export default function Authentication() {
    const [userAuth, getUserAuth] = React.useState();
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'UPDATING':
                    return {
                        ...prevState,
                        isUpdating: true,
                        isLoading: false
                    }
                case 'SIGN_IN':
                    if (action.token) {
                        AsyncStorage.setItem('userToken', action.token);
                    }
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        //This is state
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            isUpdating: false
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let auth;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                auth = await AsyncStorage.getItem('userAuth');
                await getUserAuth(auth);
            } catch (e) {
                // Restoring token failed
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        //Check update
        const checkForUpdate = async () => {
            await CodePush.checkForUpdate().then((update) => {
                if (!update) {
                    console.log('App is up to date');
                    bootstrapAsync();
                } else {
                    console.log('has a update')
                    dispatch({ type: 'UPDATING' });
                }
            });
        }
        checkForUpdate();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                await getData(
                    {
                        username: data.username,
                        password: data.password,
                    }
                )
                await AsyncStorage.getItem('userAuth').then(data => {
                    getUserAuth(data)
                });
                data.updateState({
                    ...state,
                    loading: false
                });
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: async () => {
                await AsyncStorage.removeItem('userAuth');
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userDetail');
                dispatch({ type: 'SIGN_OUT' })
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    {state.isLoading ? (
                        <Stack.Screen name="Splash"
                            component={SplashScreen}
                            options={{
                                animationTypeForReplace: 'pop'
                            }}
                        />
                    ) : state.isUpdating ? (
                        <Stack.Screen name="UpdatingScreen"
                            component={ModalUpdating}
                            options={{
                                animationTypeForReplace: 'pop'
                            }}
                        />
                    ) : state.userToken == null ? (
                        <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{
                                title: 'Sign in',
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />
                    ) : (<Stack.Screen
                        name="Home"
                        children={(props) => <DrawerStack {...props} auth={userAuth} />}
                        options={{
                            animationTypeForReplace: 'pop'
                        }}
                    />)}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
