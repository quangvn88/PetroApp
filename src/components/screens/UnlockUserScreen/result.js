import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AppStyle from '../../../theme';

export default function Result({ userDetail }) {
    const [isActive, setActive] = React.useState('');
    React.useEffect(() => {
        const flag = Number(userDetail.UFLAG) == 0 ? 'Hoạt động' :
            userDetail.UFLAG !== undefined ? 'Bị khóa' : '';
        setActive(flag);
    }, [userDetail])
    // Animation Trạng thái
    const shakeAnimation = new Animated.Value(0);
    const startShake = () => {
        let times = 0;
        let id = setInterval(() => {
            if (times == 1)
                clearInterval(id);
            times++;
            Animated.sequence([
                Animated.timing(shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -5, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
            ]).start();
        }, 200);
    };
    React.useEffect(() => {
        if (isActive !== '')
            startShake()
    });
    return (
        <View style={styles.container}>
            <View style={AppStyle.StyleCommon.titleInput}>
                <FontAwesome color='#cfc215' name='user' size={25} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                lineHeight: 28,
                                paddingVertical: 2,
                                color: !userDetail.TITLE ? '#878f92' : 'black'
                            }}>{userDetail.TITLE ? userDetail.TITLE : 'Title'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 3, flexDirection: 'row' }}>
                    <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: 5 }}>
                        {isActive === 'Hoạt động' ? <FontAwesome5 color='green' name='user-check' size={25} />
                            : isActive === 'Bị khóa' ? <FontAwesome5 color='red' name='user-lock' size={25} />
                                : <MaterialCommunityIcons color='blue' name='account-search' size={30} />
                        }
                    </View>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        flex: 7,
                        justifyContent: 'center'
                    }}>
                        <Animated.View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: [{ translateX: shakeAnimation }]
                        }}>
                            <Text style={{
                                lineHeight: 28,
                                paddingVertical: 2,
                                color: isActive == 'Hoạt động' ? 'green' :
                                    isActive == '' ? '#878f92' : 'red',
                            }}>{isActive === '' ? 'Trạng thái' : isActive}</Text>
                        </Animated.View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                lineHeight: 28,
                                paddingVertical: 2,
                                color: !userDetail.NAME_FIRST ? '#878f92' : 'black'
                            }}>{userDetail.NAME_FIRST ? userDetail.NAME_FIRST : 'Họ'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 3 }}>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                lineHeight: 28,
                                paddingVertical: 2,
                                color: !userDetail.NAME_LAST ? '#878f92' : 'black'
                            }}>{userDetail.NAME_LAST ? userDetail.NAME_LAST : 'Tên'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.StyleCommon.titleInput}>
                        <FontAwesome5 color='#404a52' name='user-tie' size={25} />
                    </View>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                lineHeight: 28,
                                paddingVertical: 2,
                                color: !userDetail.FUNCTION ? '#878f92' : 'black'
                            }}>{userDetail.FUNCTION ? userDetail.FUNCTION : 'Function'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.StyleCommon.titleInput}>
                        <FontAwesome5 color='#f36b21' name='users' size={25} />
                    </View>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text
                                style={{
                                    lineHeight: 28,
                                    paddingVertical: 2,
                                    color: !userDetail.DEPARTMENT ? '#878f92' : 'black'
                                }}>{userDetail.DEPARTMENT ? userDetail.DEPARTMENT : 'Department'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.StyleCommon.titleInput}>
                        <Entypo color='red' name='location' size={25} />
                    </View>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text
                                style={{
                                    lineHeight: 28,
                                    paddingVertical: 2,
                                    color: !userDetail.ROOMNUMBER ? '#878f92' : 'black'
                                }}>{userDetail.ROOMNUMBER ? userDetail.ROOMNUMBER : 'Room number'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.StyleCommon.titleInput}>
                        <FontAwesome5 color='#fff' name='users' size={25} />
                    </View>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text
                                style={{
                                    lineHeight: 28,
                                    paddingVertical: 2,
                                    color: !userDetail.FLOOR ? '#878f92' : 'black'
                                }}>{userDetail.FLOOR ? userDetail.FLOOR : 'Floor'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.StyleCommon.titleInput}>
                        <Entypo color='green' name='old-phone' size={25} />
                    </View>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text
                                style={{
                                    lineHeight: 28,
                                    paddingVertical: 2,
                                    color: !userDetail.TEL_NUMBER ? '#878f92' : 'black'
                                }}>{userDetail.TEL_NUMBER ? userDetail.TEL_NUMBER : 'Phone'}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={AppStyle.StyleCommon.titleInput}>
                        <MaterialCommunityIcons color='brown' name='phone' size={25} />
                    </View>
                    <View style={{
                        ...AppStyle.StyleCommon.textInputContainer,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text
                                style={{
                                    lineHeight: 28,
                                    paddingVertical: 2,
                                    color: !userDetail.MOBILE ? '#878f92' : 'black'
                                }}>{userDetail.MOBILE ? userDetail.MOBILE : 'Mobile'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container:
    {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    title: {

    },
    value: {

    },
});