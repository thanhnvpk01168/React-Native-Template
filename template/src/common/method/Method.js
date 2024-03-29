import { Alert } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import RNRestart from 'react-native-restart';
import { COLORS } from '../Constants';
import { KeyStorage } from '../storage/KeyStorage';
import { setItemStorageMMKV } from '../storage/StorageMMK';

export const onShowErrorBase = (msg) => {
    Alert.alert(msg);
};

export const restartApp = () => {
    RNRestart.Restart();
};

export const changeLanguageApp = (language) => {
    setItemStorageMMKV(KeyStorage.lngI18n, language);
};

export const showToast = ({
    content = "empty",
    contentStyle = { color: 'black' },
    backgroundColor = 'white',
    showBtnClose = false,
}) => {
    //  <ToastNormal />
    EventRegister.emitEvent("show_toast", {
        content_e: content,
        contentStyle: contentStyle,
        backgroundColor: backgroundColor,
        showBtnClose: showBtnClose
    })
}

const flashMsgDefault = {
    backgroundColor: COLORS.successBg,
    message: "Writes your message here",
    textStyle: { color: COLORS.successText }
}
export const showFlashMsg = (props) => {
    //  <FlashMessage />
    EventRegister.emitEvent("show_flash_msg", {
        ...flashMsgDefault,
        ...props
    })
}

export const showLoadingApp = (status = true) => {
    EventRegister.emitEvent("show_loading_app", status);
}
