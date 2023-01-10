import * as React from 'react';
import { AuthPageContainer, HoroscopeCardContainer, ZodiacSignListContainer } from '@aztro-daily-horoscope/ui';
import { rootStore } from '@aztro-daily-horoscope/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const policy = 'B2C_1_ihgportal_signin';
const clientId = 'f92b1dce-5bde-473d-a45f-799f38b6b873';

const config = {
  issuer: 'https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/B2C_1_ihgportal_signin/v2.0/',
  clientId,
  // redirectUrl: 'urn.ietf.wg.oauth.2.0.oob://oauthredirect',
  redirectUrl: 'aztrodailyhoroscope://callback',
  additionalParameters: { p: policy },
  scopes: ['openid', 'offline_access', clientId],

  serviceConfiguration: {
     authorizationEndpoint: 'https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/B2C_1_ihgportal_signin/oauth2/v2.0/authorize',
     tokenEndpoint: 'https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/B2C_1_ihgportal_signin/oauth2/v2.0/token',
     revocationEndpoint: 'https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/B2C_1_ihgportal_signin/oauth2/v2.0/logout'
   }
};

// const authPolicy = 'B2C_1_ihgportal_signin';
// const authClientId = 'f92b1dce-5bde-473d-a45f-799f38b6b873';
// const authConfig = {
//   issuer: `https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/${authPolicy}/v2.0/`,
//   clientId: authClientId,
//   // redirectUrl: 'urn.ietf.wg.oauth.2.0.oob://oauthredirect',
//   redirectUrl: 'aztrodailyhoroscope://callback',
//   additionalParameters: { p: authPolicy },
//   scopes: ['openid', 'offline_access', authClientId],

//   serviceConfiguration: {
//      authorizationEndpoint: `https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/${authPolicy}/oauth2/v2.0/authorize`,
//      tokenEndpoint: `https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/${authPolicy}/oauth2/v2.0/token`,
//      revocationEndpoint: `https://ihgb2cdev.b2clogin.com/ihgb2cdev.onmicrosoft.com/${authPolicy}/oauth2/v2.0/logout`
//    }
// };

const App = () => {
  return (
    <Provider store={rootStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthPageContainer} initialParams={config}/>
          <Stack.Screen name="Zodiac List" component={ZodiacSignListContainer} />
          <Stack.Screen name="Horoscope Card" component={HoroscopeCardContainer} />
        </Stack.Navigator>
      </NavigationContainer>
      
    </Provider>
  );
};

export default App;