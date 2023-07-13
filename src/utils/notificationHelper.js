import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('AUTH STATUS: ', authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
    console.log('Authorization status:', authStatus);
  }
};
export const getFcmToken = async () => {
  console.log('This is notfication handler');
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    try {
      let token = await messaging().getToken();
      console.log('Token()(): ', token);
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
      }
    } catch (e) {
      console.log(`Can not get fcm token ${e}`);
    }
  }
};
export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification!!!!', remoteMessage.notification);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('Notfi111:  ', remoteMessage.notification);
    });
  messaging().onMessage(async remoteMessage => {
    console.log('33333333,', remoteMessage);
  });
};
