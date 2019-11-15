import React, {useEffect} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

export default ({navigation}) => {
  const {givenName, familyName, url} = navigation.getParam('driver');

  useEffect(() => {
    navigation.setParams({
      driverName: `${givenName} ${familyName}`,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: url}} />
    </View>
  );
};
