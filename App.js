import {View, Text, Button, TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {
  getFcmToken,
  requestUserPermission,
  NotificationListner,
} from './src/utils/notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [token, settoken] = useState('');

  useEffect(() => {
    async function createChannel() {
      PushNotification.createChannel(
        {
          channelId: 'fcm_fallback_notification_channel', // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        created => console.log(`createChannel returned '${created}'`),
      );
      // const dat = {
      //   channelId: 'fcm_fallback_notification_channel', // (required)
      //   channelName: 'My channel',
      //   //... You can use all the options from localNotifications
      //   message: 'hello Abi', // (required)
      //   title: 'hi',
      // };
      // console.log('eeeeee', dat);
      // PushNotification.localNotification(dat);
      requestUserPermission();
      // NotificationListner();
      getFcmToken();
      const createChannel = PushNotification.createChannel({
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
      });
      console.log('NOTIFICATION()():  ', createChannel);
    }
    createChannel();
  }, []);

  /**********Foreground */

  /********** */
  const handleSubmit_Button1 = async () => {
    console.log('Buuton1##', 'hello');

    PushNotification.localNotification({
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      message: 'Hello Abi',
    });
    // const firebaseToken = await firebase.messaging().getToken();
    // console.log('MESSAGEING TEST!!!!!!!!!!!!: ', firebaseToken);
    // if (firebaseToken) {
    //   await firebase.messaging().subscribeToTopic('topic');

    //   settoken(firebaseToken);
    // }
    // NetInfo.fetch()
    //   .then(state => {
    //     if (state.isConnected) {
    //       fetch('http://localhost:8080/api', {
    //         method: 'POST',
    //       });
    //     }
    //   })
    fetch('http://localhost:8080/api', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        console.log('SUCC: ', json);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const handleSubmit_Button2 = () => {
    console.log('Button2##', 'hello222');
    PushNotification.localNotification({
      channelId: 'channel-id', // (required)
      channelName: 'My channel', // (required)
      message: 'Hello Blaze',
    });
  };

  const getFcmToken = async () => {
    const firebaseToken = await firebase.messaging().getToken();
    console.log('MESSAGEING TEST!!!!!!!!!!!!: ', firebaseToken);
    if (firebaseToken) {
      await firebase.messaging().subscribeToTopic('topic');

      settoken(firebaseToken);
    }
    // let token = await AsyncStorage.getItem('fcmToken');
    // console.log('SET TOKEN()!!: ', token);
    // if (token) {
    //   settoken(token);
    // }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Welcome PushNotification</Text>
      <Text>{token}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: '50%',
              height: '25%',
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleSubmit_Button1}
          >
            <Text style={{color: 'white'}}>Button 1</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              // flex: 2,
              width: '50%',
              height: '25%',
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleSubmit_Button2}
          >
            <Text style={{color: 'white'}}>Button 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
