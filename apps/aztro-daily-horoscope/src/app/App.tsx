import * as React from 'react';
import { HoroscopeCardContainer, ZodiacSignListContainer } from '@aztro-daily-horoscope/ui';
import { rootStore } from '@aztro-daily-horoscope/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={rootStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Zodiac List" component={ZodiacSignListContainer} />
          <Stack.Screen name="Horoscope Card" component={HoroscopeCardContainer} />
        </Stack.Navigator>
      </NavigationContainer>
      
    </Provider>
  );
};

export default App;