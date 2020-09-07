import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppStyle from '../../theme';

const screenHeight = Dimensions.get('window').height;

const FormatDate = (myValue) => {
    var date = myValue.getDate();
    date = date < 10 ? '0' + date : date;
    var month = myValue.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var year = myValue.getFullYear();
    return date + '/' + month + '/' + year;
}

const FormatHour = (myValue) => {
    var hour = myValue.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minutes = myValue.getMinutes();
    minutes.toString();
    console.log(minutes);
    if (minutes < 10) minutes = '0' + minutes;
    return hour + ':' + minutes + ':00';
}

const CurrentDate = () => {
    var date = new Date().getDate(); //Current Date
    date = date < 10 ? '0' + date : date;
    var month = new Date().getMonth() + 1; //Current Month
    month = month < 10 ? '0' + month : month;
    var year = new Date().getFullYear(); //Current Year
    return (date + '/' + month + '/' + year);
}

const CurrentHours = () => {
    var hours = new Date().getHours();
    if (hours < 10) hours = '0' + hours;
    var minutes = new Date().getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return (hours + ':' + minutes + ':00');
}

export default function DateTimePicker({ modeDate, setValueDate }) {
    const [myValue, setValue] = useState(modeDate == 'date' ? CurrentDate() : CurrentHours());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDatePickerVisibility(false);
        switch (modeDate) {
            case 'date':
                setValueDate((modeDate === 'date' ? FormatDate(date) : FormatHour(date)));
                setValue((modeDate === 'date' ? FormatDate(date) : FormatHour(date)));
                break;
            case 'time':
                setValueDate((modeDate === 'date' ? FormatDate(date) : FormatHour(date)));
                setValue((modeDate === 'date' ? FormatDate(date) : FormatHour(date)));
                break;
        }
    };
    return (
        <View style={AppStyle.StyleCommon.textInputContainer}>
            <TouchableOpacity
                onPress={() => showDatePicker()}
                delayPressIn={0}
                style={styles.buttonText}
            >
                <Text style={{ lineHeight: 28 }}>{myValue}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => showDatePicker()}
                delayPressIn={0}
            >
                <Icon name={'calendar'} size={27} color={'#fd463d'} />
            </TouchableOpacity>
            <DateTimePickerModal
                headerTextIOS={modeDate != 'date' ? 'Chọn thời gian' : 'Chọn ngày'}
                cancelTextIOS={'Hủy'}
                confirmTextIOS={'Chọn'}
                isDarkModeEnabled={false}
                isVisible={isDatePickerVisible}
                mode={modeDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    buttonText: {
        flex: 1,
        padding: 0,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    containerDateIOS: {
        height: screenHeight / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});