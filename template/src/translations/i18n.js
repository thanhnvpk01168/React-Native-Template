import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { KeyStorage } from '../common/storage/KeyStorage';
import { getItemStorageMMKV, setItemStorageMMKV } from '../common/storage/StorageMMK';
import en from './source/en'
import fr from './source/fr'
import jp from './source/jp'

// import { NativeModules, Platform } from 'react-native';
// const deviceLanguage =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale ||
//     NativeModules.SettingsManager.settings.AppleLanguages[0]
//     : NativeModules.I18nManager.localeIdentifier;

// console.log("deviceLanguage: ", deviceLanguage); //en_US

export const LIST_LANGUAGE = ["en", "fr", "jp"];
const resources = {
  en: { translation: en },
  fr: { translation: fr },
  jp: { translation: jp },
}

let lng = "en";
let lngI18n = getItemStorageMMKV(KeyStorage.lngI18n);

if (LIST_LANGUAGE.includes(lngI18n)) {
  lng = lngI18n
} else {
  setItemStorageMMKV(KeyStorage.lngI18n, lng);
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: lng, // if you're using a language detector, do not define the lng option
    fallbackLng: lng,

    interpolation: {
      escapeValue: false
    }
  });

function translate(key) {
  return key ? i18n.t(key) : '';
}

export {
  i18n,
  translate
};
