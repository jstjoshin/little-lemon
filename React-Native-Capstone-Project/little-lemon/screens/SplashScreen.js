import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image
            source={require('../assets/icon.png')}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={'Little Lemon Logo'}
            style={styles.iconImage}
        />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  iconImage: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
});