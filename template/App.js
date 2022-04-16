import React, { Suspense } from 'react';
import { StatusBar, StyleSheet, UIManager, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import KeyboardManager from 'react-native-keyboard-manager';
import { I18nextProvider } from 'react-i18next';
import { PortalProvider } from '@gorhom/portal';

import AppNavigation from './src/navigation/AppNavigation';
import { isIos } from './src/common/Constants';
import { i18n } from './src/translations/i18n'
import ToastNormal from './src/components/toast/ToastNormal';
import AppModeComponent from '~/components/appMode/AppModeComponent';
import LoadingApp from '~/components/loadingApp/LoadingApp';
import { Provider } from 'react-redux';
import store from '~/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from '~/components/toast/FlashMessage';
import { AppMode, configBuildModes } from '~/common/ConfigApp';


if (!isIos) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

if (isIos) {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setEnableAutoToolbar(false);
  // KeyboardManager.setToolbarDoneBarButtonItemText("Done");
  // KeyboardManager.setToolbarManageBehaviourBy("subviews"); // "subviews" | "tag" | "position"
  // KeyboardManager.setToolbarPreviousNextButtonEnable(false);
  // KeyboardManager.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
  // KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
  // KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(true);
  KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.resignFirstResponder();
  KeyboardManager.reloadLayoutIfNeeded();
  // KeyboardManager.isKeyboardShowing()
  //   .then((isShowing) => {
  //   });
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        // 'dark-content' or 'light-content'
        barStyle={"dark-content"} />
      <SafeAreaProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Suspense fallback={null}>
              <PortalProvider>
                <AppNavigation />
                <ToastNormal />
                <FlashMessage />
              </PortalProvider>
            </Suspense>
          </I18nextProvider>
        </Provider>
      </SafeAreaProvider>
      {AppMode === configBuildModes.DEV && <AppModeComponent />}
      <LoadingApp />
    </GestureHandlerRootView>
  );
};

