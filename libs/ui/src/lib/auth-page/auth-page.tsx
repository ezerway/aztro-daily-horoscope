import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import React, { useCallback } from 'react';

import { View } from 'react-native';
import { connect } from 'react-redux';
import { mapDispathToProps, mapStateToProps, AuthPageProps } from './auth-page.props';


export function AuthPage({
  authorize, refresh, logout,
  authAccessToken, authRefeshToken, authAccessTokenExpirationDate
}: AuthPageProps) {

  const navigation = useNavigation();
  const route = useRoute();
  const authConfig = route.params || {};

  const clickLogin = useCallback(() => {
    return authorize(authConfig);
  }, [authConfig, authorize]);

  const clickRefresh = useCallback(() => {
    return refresh(authConfig, authRefeshToken);
  }, [authConfig, authRefeshToken, refresh]);

  const clickLogout = useCallback(() => {
    return logout(authConfig, authAccessToken);
  }, [authConfig, authAccessToken, logout]);


  return (
    <View>
      <Input label={'Access Token:'} value={authAccessToken} editable={false}/>
      <Input label={'Refesh Token:'} value={authRefeshToken} editable={false}/>
      <Input label={'Access Token Expiration Date:'} value={authAccessTokenExpirationDate} editable={false}/>
      { authRefeshToken ? <Button onPress={clickRefresh} title={'Refresh'}></Button>: null }
      { authAccessToken ? <Button onPress={clickLogout} title={'Logout'}></Button>: null }
      { !authAccessToken ? <Button onPress={clickLogin} title={'Login'}></Button>: null }
    </View>
  );
}

export const AuthPageContainer =  connect(mapStateToProps, mapDispathToProps)(AuthPage);
