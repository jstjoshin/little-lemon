import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Hero = () => {

  return (
    <View style={styles.container}>
        <View style= {styles.headingContainer}>
            <Text style= {styles.title} >Little Lemon</Text>
            <Text style= {styles.subTitle} >Chicago</Text>
        </View>
        <View style= {styles.contentContainer} >
            <Text style= {styles.description} >
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Text>
            <Image
                style= {styles.image}
                source={require('../assets/hero-image.png')}
                resizeMode="cover"
                accessible={true}
                accessibilityLabel={'Little Lemon appetizers'}
            />
        </View>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
    backgroundColor: '#495E57',
    minHeight: 272,
  },
  headingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 64,
    color: '#F4CE14',
    fontFamily: 'MarkaziText',
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'MarkaziText',
    fontWeight: '400',
    marginTop: -20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    flex: 1,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Karla',
    fontWeight: '500',
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 16,
  },
});