import * as React from 'react';
import { View, StyleSheet, Text, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../components/Button';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../assets/little-lemon-logo.png')}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
          style={styles.iconImage}
        />
        <Text style={styles.headerText}>Home goes here</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  headerText: {
    paddingHorizontal: 30,
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Karla', 
    fontWeight: '800',
  },
  iconImage: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 50,
    marginHorizontal: 30,
    backgroundColor: '#495e57',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});