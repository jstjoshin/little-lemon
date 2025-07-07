import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeader from "./components/CustomHeader";
import SplashScreen from './screens/SplashScreen';
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ProfileImageProvider } from './utils/ContextProvider';
import * as Font from 'expo-font';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#495e57',
    secondary: '#F4CE14',
    background: '#FFFFFF',
    surface: '#EDEFEE',
    text: '#000000',
    placeholder: '#999999',
    outline: '#333333',
    activeOutline: '#495e57'
  },
  roundness: 5,
};

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Karla': require('./assets/fonts/Karla.ttf'),
        'MarkaziText': require('./assets/fonts/MarkaziText.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('@isOnboardingCompleted');
        setIsOnboardingCompleted(value === 'true');
      } catch (e) {
        console.error('Failed to load onboarding status');
      } finally {
        setIsLoading(false);
      }
    };
    loadOnboardingStatus();
  }, []);

  if (isLoading) {
    // We haven't finished reading from AsyncStorage yet
    return <SplashScreen />;
  }

  return (
    <ProfileImageProvider>
      <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isOnboardingCompleted ? 'Home' : 'Onboarding'}
            screenOptions={{
              header: (props) => <CustomHeader {...props} />
            }}
          >
            {isOnboardingCompleted ? (
              <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" >
                {(props) => <Profile {...props} setIsOnboardingCompleted={setIsOnboardingCompleted} />}
              </Stack.Screen>
              </>
            ) : (
              <Stack.Screen name="Onboarding" >
                {(props) => <Onboarding {...props} setIsOnboardingCompleted={setIsOnboardingCompleted} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ProfileImageProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  iconImage: {
    width: 147.5,
    height: 40,
  },
});