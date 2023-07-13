/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
// messaging().set(async message => {
//   console.log('MESSAGEING TEST: ', message);
// });
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION###:', notification);
//   },
//   requestPermissions: Platform.OS === 'ios',
// });
AppRegistry.registerComponent(appName, () => App);
