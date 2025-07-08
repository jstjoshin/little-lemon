import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image
            source={require('../assets/splash-icon.png')}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={'Little Lemon Logo'}
            style={styles.iconImage}
        />
        <Text style={styles.headerText}>Loading ...</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 250,
    height: 300,
  },
  headerText: {
    fontSize: 32,
    color: '#333',
    textAlign: 'center',
    paddingTop: 100,
    fontFamily: 'Karla',
    fontWeight: '800',
  },
});