// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importando as telas
import LoginScreen from './screens/LoginScreen';
import ColetorScreen from './screens/ColetorScreen';
import BonusScreen from './screens/BonusScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Coletor') {
            iconName = 'barcode-scan';
          } else if (route.name === 'Bônus') {
            iconName = 'file-document';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Coletor" component={ColetorScreen} />
      <Tab.Screen name="Bônus" component={BonusScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={BottomTabMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
